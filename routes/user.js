const express = require('express');
const router = express.Router();

const {createAuser,getALLUsers,getAUser,updateUserInfo,deleteAUser,login} = require('../controllers/user');

router.post('/user',createAuser);

router.post('/user/login',login);

router.get('/user',getALLUsers);

router.get('/user/:id',getAUser);

router.patch('/user/:id',updateUserInfo);

router.delete('/user/:id',deleteAUser);

module.exports = router;
