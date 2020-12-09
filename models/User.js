/**
 * User model for mongodb using the mongoose library. This will be the template used to describe what each individual document will look like in our collection.
 */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema)