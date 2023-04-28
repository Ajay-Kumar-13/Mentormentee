const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: String,
    Username: String,
    Password: String,
    Branch: String,
    Role: String,
    Userdetails:Array
}, {timestamps: true})

const User = mongoose.model("user", userSchema);
module.exports = User;