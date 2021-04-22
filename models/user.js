const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    mobile:Number,
    location:String,
    type:String
});

const User = mongoose.model('User',userSchema);

module.exports = User;