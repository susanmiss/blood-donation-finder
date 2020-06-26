const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const express = require('express')
const user = require('../Models/userLogin')

const defaultEmailData = { from: "noreply@node-react.com" };

exports.sendEmail = ((req, res) => {
  console.log(req.body);
  const output = `
    <p>You have a new Contact request</p>
    <h3>Contact details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message:</h3>
    <p>${req.body.message}</p>
  `;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "susanfochesatto@gmail.com",
      pass: "su2004queromuito"
    },
    tls: {
      rejectUnauthorized:false
    }
});

let receiver = "fsusan@icloud.com"
// let receiver = User.email

let mailOptions = {
  from: 'susanfochesatto@gmail.com', // sender address
  to: receiver, // list of receivers
  subject: 'Contact from Blood Donation Finder', // Subject line
  text: 'Hello world?', // plain text body
  html: output // html body
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
 return res.redirect('/')
});
