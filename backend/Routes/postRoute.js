const express = require('express');
const {getDummyPosts, getPosts, createPost, postsByHospital, deletePost,isPoster, updatePost, singlePost, like, unlike} = require('../Controllers/postController')
const { requireHospitalSignin } = require('../Controllers/authController');
const { requireSignin } = require('../Controllers/authController')
const {hospitalById} = require('../Controllers/hospitalController')
const {postById} = require('../Controllers/postController')
const { createPostValidator } = require('../Validators/index')




const router = express.Router();

// //Get routes: 
router.get('/dummyposts', getDummyPosts);
router.get('/posts', getPosts);
router.put('/post/like', requireSignin, like)
router.put('/post/unlike', requireSignin, unlike)
router.post('/post/new/:hospitalId' , createPost); //createPostValidator goes in the end:
router.get('/post/:postId', singlePost)

// // post routes
router.get('/posts/by/:hospitalId', postsByHospital);
router.put('/post/:postId', requireHospitalSignin, isPoster, updatePost);
router.delete('/post/:postId', requireHospitalSignin, isPoster, deletePost);


// // any route containing :hospitalId or : postId, our app will first execute hospitalById() / postById()
router.param("hospitalId", hospitalById);
router.param("postId", postById);


module.exports = router;