const express = require('express');
const router = express.Router();

const {userSignUpValidator, hospitalSignUpValidator, passwordResetValidator} =  require('../Validators/index')
const {signup, signin, signout, hospitalSignup, hospitalSignin, forgotPassword,resetPassword} = require('../Controllers/authController')
const {sendEmail} = require('../Controllers/sendEmail')
const {userById} = require('../Controllers/userController')
const {hospitalById} = require('../Controllers/hospitalController')


router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);


router.post('/signup', userSignUpValidator, signup);
router.post('/hospital-signup', hospitalSignUpValidator, hospitalSignup);
router.post('/signin', signin);
router.post('/hospital-signin', hospitalSignin);
router.get('/signout', signout);

router.post('/sendemail', sendEmail)

// any route containing :userId or hospitalID, our app will first execute userByID() or hospitalByID
router.param('hospitalId', hospitalById);

module.exports = router;