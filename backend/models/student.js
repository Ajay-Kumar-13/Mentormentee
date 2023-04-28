const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    Name: String,
    createdAt: String,
    description: String,
    title: String,
})

const Case = mongoose.model("Case", studentSchema);

module.exports = Case;