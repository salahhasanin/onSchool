const mongoose = require('mongoose');
const User = mongoose.model('User');
const Video = mongoose.model('Video');
//require('mongoose').set('debug', true);
var cron = require('node-cron');
  /* ===============================================================
     GIT All Users
  =============================================================== */

module.exports.getAllUsers=(req, res, next)=>{
    User.find({roles:'user'})
    .exec(function(err, users){
        if(err){
          //  res.send("Error retrieving videos");
          console.log('Error in get all  user :' + JSON.stringify(err, undefined, 2));
        }else{
            res.send(users);
        }
    })
}
  /* ===============================================================
     GIT User
  =============================================================== */
module.exports.getUser=(req, res, next)=>{
    User.findById(req.params.id)
    .exec(function(err, users){
        if(err){
           // res.send("Error retrieving videos");
           console.log('Error in get one user :' + JSON.stringify(err, undefined, 2));
        }else{
            res.send(users);
        }
    })
}
  /* ===============================================================
     Update User
  =============================================================== */
module.exports.updateUser=(req,res)=>{
    var user = {
        roles: req.body.roles,
       // access: req.body.access,
        //category:req.body.category, //for teacher

    };
    //{ new: true } test mongo whether we want to return updated data of employee back to response
    // if new = true then doc will have updated details
    User.findByIdAndUpdate(req.params.id, { $set: user ,$push:{access: req.body.access}}, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in user Update :' + JSON.stringify(err, undefined, 2)); }
    });   
}
  /* ===============================================================
    Delete User
  =============================================================== */
module.exports.deleteUser=(req,res)=>{
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in user Delete :' + JSON.stringify(err, undefined, 2)); }
    });
}

/////////////////////all function for teacher/////////////////////////////////
  /* ===============================================================
     GIT All Teachers
  =============================================================== */
  module.exports.getAllTeachers=(req, res, next)=>{ ///////fe7a 7aga lesaaaaaaa
    User.find({roles:'teacher'})
    .exec(function(err, teacher){
        if(err){
          //  res.send("Error retrieving videos");
          console.log('Error in get all  teacher :' + JSON.stringify(err, undefined, 2));
        }else{
            res.send(teacher);
        }
    })
}

  /* ===============================================================
     GIT All Teachers in specific
  =============================================================== */
  module.exports.getAllTeachersInCategory=(req, res, next)=>{ ///////fe7a 7aga lesaaaaaaa
    User.find({roles:'teacher',category:req.params.category})
    .exec(function(err, teacher){
        if(err){
          //  res.send("Error retrieving videos");
          console.log('Error in get all  teacher :' + JSON.stringify(err, undefined, 2));
        }else{
            res.send(teacher);
        }
    })
}


  /* ===============================================================
     GIT All Categroy from enum
  =============================================================== */
  module.exports.getCategory=(req,res,next)=>{
    res.send( User.schema.path('category').enumValues);
  }

  /* ===============================================================
     add Categroy for user who is changed his role to teacher
  =============================================================== */
module.exports.addCategory=(req,res,next)=>{
   /* User.findById(req.params.id, function (foundUser) {
         foundUser=new User({ category:req.body.category })
      foundUser.save((err,doc)=>{
        if(!err){ res.send(doc);}
        else {  return console.log(err);  } }) })*/
 User.findByIdAndUpdate(req.params.id, { $set:{category:req.body.category }}, { new: true }, (err, doc) => {
    if(!err){res.send(doc)}
    else{console.log(err)}
})
  }


 /*  ===============================================================
     GIT All Teachers name from access 
  =============================================================== */

module.exports.getUserAccess=(req,res,next)=>{
    User.findById(req.params.id).select('access').exec(function(err, doc){
        if (!err) { res.send(doc); }
        else { console.log('Error in get access :' + JSON.stringify(err, undefined, 2));
         next(err) 
            }
    });   
}
  /* ===============================================================
     if delete teacher delete all videos created by this teacher//////////// RAG3EEEEN
  =============================================================== 
  module.exports.deleteRelated=(req,res,next)=>{
   User.findOneAndRemove({fullName:req.body.fullName},(err,doc)=>{
       if(err){console.log(err);}
       else{
           Video.find({createdBy:req.body.fullName},(err,rees)=>{
            if (!err) { //res.send(rees); 
                       // res.send(doc);
                       console.log(rees);
                    }
            else { console.log('Error in user Delete :' + JSON.stringify(err, undefined, 2)); }
        });
          res.send(doc);
       }
   }) 
  }
*/
////////////////////////////////////////////////////////////////////////////
  /* ===============================================================
    Delete All Data IN Access For Users Every Mobth
  =============================================================== 
cron.schedule('* *', (req,res) => {
    User.update({roles: "user"},{ $set:{ access: [] }});
  });
*/

