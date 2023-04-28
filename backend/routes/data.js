const router = require('express').Router();
const fs = require("fs");
const XLSX = require("xlsx");
const jsontoxml = require("jsontoxml");

const Case = require('../models/student');
const Message = require('../models/message');

const workbook = XLSX.readFile("Book1.xlsx");
let worksheets = {};

for (const SheetName of workbook.SheetNames) {
    worksheets[SheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[SheetName]);
}


router.get('/cases/:student', (req, res) => {
    const name = req.params.student;
    Case.find({ Name: name }, (err, docs) => {
        console.log("cases", docs);
        if (!err) {
            res.send(docs);
        }
    })
})


router.get("/:sheetname/:rollnumber", (req, res) => {
    console.log("in main");
    const data = worksheets[req.params.sheetname];
    var newData = data.filter(function (student) {
        return student.REGISTRATIONNUMBER == req.params.rollnumber;
    });

    res.json(newData);
})


router.get("/mentor/:sheetname/:id", (req, res) => {
    console.log("sheetname", req.params.sheetname);
    const data = worksheets[req.params.sheetname];
    console.log("backend");
    console.log(data);
    var newData = data.filter(function (mentor) {
        return mentor.EmpID == req.params.id
    })
    res.json(newData);
})

router.post("/case/:studentName", (req, res) => {
    const name = req.params.studentName;
    const month = parseInt(String(new Date().getMonth())) + 1
    const date = new Date().getDate() + '/' + month + '/' + new Date().getFullYear();
    const newCase = new Case({
        Name: name,
        createdAt: date,
        title: req.body.title,
        description: req.body.description
    });
    newCase.save(err => {
        !err ? res.json({ success: true }) : res.json({ success: false });
    })
})

router.post("/sendMessage/:rollNumber", (req, res) => {
    console.log("came in nrew");
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    if (hh == 0) {
        hh = 12;
    }
    if (hh > 12) {
        hh = hh - 12;
        session = "PM";
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let time = hh + ":" + mm + ":" + ss + " " + session;
    const newMessage = new Message({
        Message: req.body.message,
        time: time,
        rollNumber: req.params.rollNumber,
    });
    newMessage.save(err => {
        !err ? res.json({ success: true }) : res.json({ success: false });
    })
})

router.delete("/deleteCase/:title", (req, res) => {
    console.log("Deleting...");
    Case.findOneAndDelete({title: req.params.title}, (err, docs)=> {
        if(!err) {
            res.send({
                success: true
            })
        }
    })
})

router.put("/updateCase/:title", (req, res) => {
    console.log("updating...");
    const updatedcase = {
        title: req.body.title,
        description: req.body.description
    }
    Case.findOneAndUpdate({title: req.params.title}, updatedcase, (err, docs) => {
        if(!err) {
            res.send({
                success: true
            })
        }
    })
})


module.exports = router;