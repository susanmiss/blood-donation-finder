const jwt = require('jsonwebtoken')
require('dotenv').config()
const expressJwt = require('express-jwt');
const User =  require('../Models/userLogin')
const Hospital =  require('../Models/hospitalLogin')


exports.signup =  async (req, res) => {
    const userExists =  await User.findOne({email: req.body.email});
    if(userExists) return res.status(403).json({
        error: 'Email has already been taken'
    });
     const user = await new User(req.body);
     user.save();
     res.status(200).json({
        // user: user
        message: "User created successfuly. PLease login."
    })
   
};

exports.hospitalSignup =  async (req, res) => {
    const hospitalExists =  await Hospital.findOne({hospitalEmail: req.body.hospitalEmail});
    if(hospitalExists) return res.status(403).json({
        error: 'Email has already been taken'
    });
     const hospital = await new Hospital(req.body);
     hospital.save();
     res.status(200).json({
        //hospital: hospital
         message: "Hospital user created successfuly. Please login."
    })
   
};


exports.signin = (req, res) => {
    //find the user based on email
     const {_id, email, password} = req.body 
     User.findOne({email}, (err, user) => {
        //if err or not user
        if(err || !user){
            return res.status(401).json({
                error: "User with this email does not exist. Please signup."
            })
        }
        //if user is found make sure the email and passwor match.
        //create authenticate method in model and use here.
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password do not match'
            })
        }
         //if no user, handle error

        //if user found, authenticate

        //generate a token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        //persist token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to front client:
        const {_id, name, email} = user
        return res.json({token, user:{_id, name, email}})
     })
}

exports.hospitalSignin = (req, res) => {
    //find the user based on email
     const {_id, hospitalEmail, password} = req.body 
     Hospital.findOne({hospitalEmail}, (err, hospital) => {
        //if err or not user
        if(err || !hospital){
            return res.status(401).json({
                error: "Hospital/Clinic with this email does not exist. Please signup."
            })
        }
        //if user is found make sure the email and passwor match.
        //create authenticate method in model and use here.
        if(!hospital.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password do not match'
            })
        }

        //generate a token with user id and secret
        const token = jwt.sign({_id: hospital._id}, process.env.JWT_SECRET)
        //persist token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to front client:
        const {_id, hospitalName, hospitalEmail} = hospital
        return res.json({token, hospital:{_id, hospitalName, hospitalEmail}})
     })
}

exports.signout = (req, res) => {
    res.clearCookie('t')
    return res.json({ message: "User/Hospital has been logged out successfuly"})
}

exports.requireSignin = expressJwt({
    //if the token is valid, express-jwt appends the verifieds users id
    //in an auth key to the request object
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
})

exports.requireHospitalSignin = expressJwt({
    //if the token is valid, express-jwt appends the verifieds users id
    //in an auth key to the request object
    secret: process.env.JWT_SECRET,
    userProperty: "auth" //should be hospitalProperty, but didn't work
})