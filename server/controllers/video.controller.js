const mongoose = require('mongoose');
const User = mongoose.model('User');
const Video = mongoose.model('Video');

  /* ===============================================================
     GIT All Video
  =============================================================== */
module.exports.getAllVideos=(req, res, next)=>{
    Video.find({})
    .exec(function(err, videos){
        if(err){
          //  res.send("Error retrieving videos");
          console.log('Error in get all  Employee :' + JSON.stringify(err, undefined, 2));
        }else{
            res.send(videos);
        }
    })
}
  /* ===============================================================
     GIT Video
  =============================================================== */
module.exports.getVideo=(req, res, next)=>{
    Video.findById(req.params.id)
    .exec(function(err, videos){
        if(err){
           // res.send("Error retrieving videos");
           console.log('Error in get one Employee :' + JSON.stringify(err, undefined, 2));
        }else{
            res.send(videos);
        }
    })
}
  /* ===============================================================
    ADD New Video
  =============================================================== */
module.exports.addVideo=(req, res, next)=>{
    if (!req.body.title) {
        res.json({ success: false, message: 'Video title is required.' }); // Return error message
      } else {
        // Check if blog body was provided
        if (!req.body.url) {
          res.json({ success: false, message: 'Video body is required.' }); // Return error message
        } else {
          // Check if blog's creator was provided
          if (!req.body.createdBy) {
            res.json({ success: false, message: 'Video creator is required.' }); // Return error
          }if (!req.body.description) {
                res.json({ success: false, message: 'Video creator is required.' });
          }
        }}
    var video=new Video({
    title: req.body.title,
    url:  req.body.url,
    description: req.body.description,
    createdBy: req.body.createdBy,
   // createdAt
  //  category:req.body.category
 });
    video.save((err, doc) => {
        if (!err){
            //return res.status(200).json({message: 'success!', response: 'success!'});
            res.send(doc);
        }
        else {
               return /*next(err);*/console.log(err);
           //console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));
        }
    });
}
  /* ===============================================================
     Update Video
  =============================================================== */
module.exports.updateVideo=(req,res)=>{
    var vid = {
        title: req.body.title,
        url:  req.body.url,
        description: req.body.description,
      //  category:req.body.category
    };
    //{ new: true } test mongo whether we want to return updated data of employee back to response
    // if new = true then doc will have updated details
    Video.findByIdAndUpdate(req.params.id, { $set: vid }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });   
}
  /* ===============================================================
     Delete Video
  =============================================================== */
module.exports.deleteVideo=(req,res)=>{
    Video.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
}



   /* ===============================================================
     GIT All video that created by Teacher  
  =============================================================== */
  module.exports.getVideoTeacher=(req,res,next)=>{
    Video.find({createdBy:req.params.createdBy}).exec(function(err, video){
      if(err){
        //  res.send("Error retrieving videos");
        console.log('Error in get all  videos :' + JSON.stringify(err, undefined, 2));
      }else{
          res.send(video);
      }
    })
  }



  /* ===============================================================
     LIKE Video
  =============================================================== */
  module.exports.likeVideo=(req, res) => {
    // Check if id was passed provided in request body
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided.' }); // Return error message
    } else {
      // Search the database with id
      Video.findOne({ _id: req.body.id }, (err, video) => {
        // Check if error was encountered
        if (err) {
          res.json({ success: false, message: 'Invalid video id' }); // Return error message
        } else {
          // Check if id matched the id of a video post in the database
          if (!video) {
            res.json({ success: false, message: 'That video was not found.' }); // Return error message
          } else {
            // Get data from user that is signed in
            User.findOne({ _id: req.body.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: 'Something went wrong.' }); // Return error message
              } else {
                // Check if id of user in session was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Could not authenticate user.' }); // Return error message
                } else {
                  // Check if user who liked post is the same user that originally created the video post
                  if (user.fullName === video.createdBy) {
                    res.json({ success: false, messagse: 'Cannot like your own video.' }); // Return error message
                  } else {
                    // Check if the user who liked the post has already liked the video post before
                    if (video.likedBy.includes(user.fullName)) {
                      res.json({ success: false, message: 'You already liked this video.' }); // Return error message
                    } else {
                      // Check if user who liked post has previously disliked a post
                      if (video.dislikedBy.includes(user.fullName)) {
                        video.dislikes--; // Reduce the total number of dislikes
                        const arrayIndex = video.dislikedBy.indexOf(user.fullName); // Get the index of the username in the array for removal
                        video.dislikedBy.splice(arrayIndex, 1); // Remove user from array
                        video.likes++; // Increment likes
                        video.likedBy.push(user.fullName); // Add fullName to the array of likedBy array
                        // Save video post data
                        video.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'video liked!' }); // Return success message
                          }
                        });
                      } else {
                        video.likes++; // Incriment likes
                        video.likedBy.push(user.fullName); // Add liker's fullName into array of likedBy
                        // Save video post
                        video.save((err) => {
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'video liked!' }); // Return success message
                          }});}}}}}});}}});}};
   
  /* ===============================================================
     DISLIKE Video 
  =============================================================== */
  module.exports.DislikeVideo=(req, res) => {
    // Check if id was provided inside the request body
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided.' }); // Return error message
    } else {
      // Search database for blog post using the id
      Video.findOne({_id: req.body.id }, (err, video) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid video id' }); // Return error message
        } else {
          // Check if video post with the id was found in the database
          if (!video) {
            res.json({ success: false, message: 'That video was not found.' }); // Return error message
          } else {
            // Get data of user who is logged in
            User.findOne({_id: req.body.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: 'Something went wrong.' }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Could not authenticate user.' }); // Return error message
                } else {
                  // Check if user who disliekd video is the same person who originated the video 
                  if (user.fullName === video.createdBy) {
                    res.json({ success: false, messagse: 'Cannot dislike your own video.' }); // Return error message
                  } else {
                    // Check if user who disliked video has already disliked it before
                    if (video.dislikedBy.includes(user.fullName)) {
                      res.json({ success: false, message: 'You already disliked this video.' }); // Return error message
                    } else {
                      // Check if user has previous disliked this video
                      if (video.likedBy.includes(user.fullName)) {
                        video.likes--; // Decrease likes by one
                        const arrayIndex = video.likedBy.indexOf(user.fullName); // Check where fullName is inside of the array
                        video.likedBy.splice(arrayIndex, 1); // Remove fullName from index
                        video.dislikes++; // Increase dislikeds by one
                        video.dislikedBy.push(user.fullName); // Add fullName to list of dislikers
                        // Save video data
                        video.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'video disliked!' }); // Return success message
                          }
                        });
                      } else {
                        video.dislikes++; // Increase likes by one
                        video.dislikedBy.push(user.fullName); // Add fullName to list of likers
                        // Save video data
                        video.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'video disliked!' }); // Return success message
                          }});}}}}}});}}})}};

                            /* ===============================================================
     COMMENT ON BLOG POST
  =============================================================== */
  module.exports.commentVideo=(req, res) => {
    // Check if comment was provided in request body
    if (!req.body.comment) {
      res.json({ success: false, message: 'No comment provided' }); // Return error message
    } else {
      // Check if id was provided in request body
      if (!req.body.id) {
        res.json({ success: false, message: 'No id was provided' }); // Return error message
      } else {
        // Use id to search for blog post in database
        Video.findOne({ _id: req.body.id }, (err, video) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: 'Invalid video id' }); // Return error message
          } else {
            // Check if id matched the id of any video post in the database
            if (!video) {
              res.json({ success: false, message: 'video not found.' }); // Return error message
            } else {
              // Grab data of user that is logged in
              User.findOne({ _id: req.body.userId }, (err, user) => {
                // Check if error was found
                if (err) {
                  res.json({ success: false, message: 'Something went wrong' }); // Return error message
                } else {
                  // Check if user was found in the database
                  if (!user) {
                    res.json({ success: false, message: 'User not found.' }); // Return error message
                  } else {
                    // Add the new comment to the video post's array
                    video.comments.push({
                      comment: req.body.comment, // Comment field
                      commentator: user.username // Person who commented
                    });
                    // Save video post
                    video.save((err) => {
                      // Check if error was found
                      if (err) {
                        res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Comment saved' }); // Return success message
                      }});}
                }});}}});}}};
