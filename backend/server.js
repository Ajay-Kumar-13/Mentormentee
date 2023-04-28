const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const dataRoute = require('./routes/data');
const authRoute = require('./routes/auth');
const mongoose = require("mongoose");

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Ajay-kumar:Ajaykumar$13@cluster0.ofmxz.mongodb.net/Mentormentee");

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/data", dataRoute);
app.use("/auth", authRoute);

app.listen(3001, (req, res) => {
    console.log('Express is up and running on port 3001');
})