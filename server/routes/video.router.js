const express = require('express');
const router = express.Router();

const ctrlVideo=require('../controllers/video.controller');
///////////////////////manage videos//////////////////////////////////////////
router.get('/getvideos',ctrlVideo.getAllVideos);
router.get('/getvideo/:id',ctrlVideo.getVideo);
router.post('/addvideo',ctrlVideo.addVideo);
router.put('/updatevideo/:id',ctrlVideo.updateVideo);
router.delete('/deletevideo/:id',ctrlVideo.deleteVideo);
///////////////////////get all videos that created by specific teacher/////////
router.get('/getvideosTeacher/:createdBy',ctrlVideo.getVideoTeacher);
///////////////////////add like or dislike or add comment on video/////////////
//router.put('/likevideo/:id/:userId',ctrlVideo.likeVideo);
router.put('/likevideo',ctrlVideo.likeVideo);
router.put('/dislikevideo',ctrlVideo.DislikeVideo);
router.post('/addcomment',ctrlVideo.commentVideo);
module.exports = router;