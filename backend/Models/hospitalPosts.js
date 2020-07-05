const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Hospital = require('../Models/hospitalLogin')


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 150
    },
    body: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 2000
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer
    },
    postedBy: {
        type: ObjectId,
        ref: "Hospital"
    },
    created: {
        type: Date,
        default: Date.now
    },
    likes: [{ type: ObjectId, ref: 'Hospital'}],
    comments: [
        {
            text: String,
            created: {type: Date, default: Date.now},
            postedBy: {type: ObjectId, ref: 'User'}
        }
    ]
});

module.exports = mongoose.model('Post', postSchema);

//mongoose.Schema.ObjectId
    //creating a RELATION: -----  Relational db ??????   -----