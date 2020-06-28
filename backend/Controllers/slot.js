// const {Appointment, Slot} = Model;
const { Appointment, Slot } = require('../Models/index');

const slotController = {
  all (req, res) {
    // Returns all Slots
      Slot.find({})
          .exec((err, slots) => res.json(slots))
  }
};

module.exports = slotController;