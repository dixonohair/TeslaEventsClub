const mongoose = require('mongoose');
const { default: test } = require('node:test');

const Schema = mongoose.Schema;


const eventSchema = new Schema({
    name: {type: String, required: [true, 'Event name is required']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    topic: {type: String, required: [true, 'Topic is required']},
    details: {type: String, required: [true, 'Content is required'], 
        minLength: [10, 'The content should have at least 10 characters']},
    date: {type: Date, required: [true, 'Date is required']},
    start: {type: String, required: [true, 'Start time is required']},
    end: {type: String, required: [true, 'End time is required']},
    host: {type: String, required: [true, 'Host is required']},
    //location: {type: String, required: [true, "Event must have a location"]},
    image: {type: String, required: [true, 'Image URL is required']}
},
{timestamps:true}
);


module.exports = mongoose.model('Event', eventSchema);


