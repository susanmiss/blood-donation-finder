const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { Appointment, Slot } = require('../Models/index');
// const { Appointment, Slot } = Model;
const Nexmo = require("nexmo");



const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({})
    .populate("slots")
    .exec(
      (err, appointments) => res.json(appointments));
  },
  create(req, res) {
    var requestBody = req.body;

    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newslot.save();
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id

    });

    // const nexmo = new Nexmo({
    //   apiKey: '89ad0674',
    //   apiSecret: 'j9kUVYMLgsTUMTK5'
    // });

    // let msg =
    //   requestBody.name +
    //   " " +
    //   "this message is to confirm your appointment at" +
    //   " " +
    //   requestBody.appointment;

    // and saves the record to
    // the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) => res.json(appointment));

      // const from = "07393536669";
      // const to = "07393536669";

      // nexmo.message.sendSms(from, to, msg, (err, responseData) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.dir(responseData);
      //   }
      // });
    });
  }
};


module.exports = appointmentController;