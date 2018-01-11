const express = require("express");
const router = express.Router();

const mongodb = require('../model/schemas/chat_mongo.js');
const mysql = require('../model/schemas/users_mysql.js');
const getHash = require('../model/getPasswordHash');

const ObjectId = require('mongodb').ObjectId;


router.post("/", (req, res, next) => {
    let login = req.body.login;
    let password = req.body.pass;
    mysql.findOne({ where: { email: `${login}` } }).then((user) => {
        if (user != null) {
            if (user.password_hash == getHash(password, user.salt)) {
                req.session.name = user.id;
                res.redirect('/chat');
            } else {
                res.render(`users`, { title: "Registration form", user: "Wrong email" });
            }
        }
        else {
            res.render(`users`, { title: "Registration form", user: "Incorrect email" });
        }
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/exit', (req, res, next) => {
    mysql.findById(req.session.name).then((user) => {
        user.updateAttributes({
            status: 'offline'
        });
        res.send(user);
    }).catch((err) => {
        console.log(err);
    });
    req.session.destroy((err) => {
        console.log(err);
    });
});

module.exports = router;
