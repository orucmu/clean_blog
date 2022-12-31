const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const MessageSchema = new Schema({
    name: String,
    title: String,
    message: String,
    dateCreated: {
        type: Date,
        default: new Date()
    }
});

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message;