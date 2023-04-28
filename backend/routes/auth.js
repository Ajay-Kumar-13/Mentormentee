const router = require('express').Router();

const User = require("../models/user");
const Conversation = require("../models/conversation");
const Message = require('../models/message');

router.post("/signUp", (req, res) => {
    console.log("signing up",req.body.userDetails);
    const newUser = new User({
        Name: req.body.Name,
        Username: req.body.username,
        Password: req.body.password,
        Branch: req.body.branch,
        Role: req.body.role,
        Userdetails: [
            req.body.userDetails
        ]
    });
    newUser.save(err => {
        !err ? res.json({ success: true }) : res.json({ success: false });
    });
})


router.post("/conversation/:senderId/:receiverId", (req, res) => {
    const conversation = new Conversation({
        members: [
            req.params.senderId,
            req.params.receiverId
        ]
    })
    conversation.save(err => {
        if (!err) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    })
})

router.get("/conversation/:userId", (req, res) => {
    Conversation.find({ members: { $in: [req.params.userId] } }, (err, docs)=> {
        if(!err) {
            res.send(docs);
        }
    })
})

router.get("/signin/:username", (req, res) => {
    User.find({ Username: req.params.username }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log("error in /auth/signin/",err);
        }
    })
})

router.post("/messages/", (req, res) => {
    const newMessage = new Message(req.body)
    newMessage.save(err => {
        if(!err) {
            res.send(newMessage);
        } else {
            res.send({success: "false"});
        }
    })
})

router.get("/messages/:conversationId", (req, res) => {
    Message.find({conversationId: req.params.conversationId}, (err, docs) => {
        if(!err) {
            res.send(docs);
        }
    })
})


module.exports = router;