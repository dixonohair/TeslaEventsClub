const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. create a schema with first name and email and choice(yes, no, maybe)
// 2. when a user rsvps, it adds their name, email, and choice to the schema 
// 3. when showing number of rsvps of the event, it looks at this schema and returns the count of how many yes, no, or maybes are in the database 
// 4. connect connection id and users who rsvp?

const rsvp = new Schema({
    firstName: {type: String},
    email: {type: String},
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    choice: {type: String}
});

