const express = require('express');
const router = express.Router();

 


const ctrlUser = require('../controllers/adminFun.controller');

router.get('/getUsers',ctrlUser.getAllUsers);
router.get('/getUser/:id',ctrlUser.getUser);
router.put('/updateUser/:id',ctrlUser.updateUser);
router.delete('/deleteUser/:id',ctrlUser.deleteUser);
////////////////////////////to add category for teacher /////////////////////////////////////////
router.get('/getTeachers',ctrlUser.getAllTeachers);///////fe7a 7aga lesaaaaaaa

router.get('/getTeacherscategory/:category',ctrlUser.getAllTeachersInCategory);
///////////////////////////////which teacher user access ////////////////////////////////////////
//router.put('/updateUserAccess/:id',ctrlUser.updateUserAccess);//with update user.
router.get('/getUserAccess/:id',ctrlUser.getUserAccess);

////////////////////////////to get category /////////////////////////////////////////////////////
router.get('/getCategory',ctrlUser.getCategory);

////////////////////////////delete teacher and his videos ///////////////////////////////////////
//router.delete('/deleteRelated',ctrlUser.deleteRelated);/// RAG3EEEEN

////// add Categroy for user who is changed his role to teacher
router.put('/addCategory/:id',ctrlUser.addCategory);


module.exports = router;