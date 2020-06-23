const express = require('express');
const router = express.Router();

const {userSignUpValidator, hospitalSignUpValidator} =  require('../Validators/index')
const {signup, signin, signout, hospitalSignup, hospitalSignin} = require('../Controllers/authController')
const {userById} = require('../Controllers/userController')
const {hospitalById} = require('../Controllers/hospitalController')



router.post('/signup', userSignUpValidator, signup);
router.post('/hospital-signup', hospitalSignUpValidator, hospitalSignup);
router.post('/signin', signin);
router.post('/hospital-signin', hospitalSignin);
router.get('/signout', signout);

// // password forgot and reset routes
// // router.put('/forgot-password', forgotPassword);
// // router.put('/reset-password', passwordResetValidator, resetPassword);


// any route containing :userId or hospitalID, our app will first execute userByID() or hospitalByID
router.param('hospitalId', hospitalById);

module.exports = router;