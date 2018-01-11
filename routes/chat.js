const express = require("express");
const router = express.Router();

const mongodb = require('../model/schemas/chat_mongo.js');
const mysql = require('../model/schemas/users_mysql.js');


router.get("/", (req, res, next) => {
    
    if (req.session.name) {
        mysql.findById(req.session.name).then((user) => {
            mysql.findAll({ where: { status: 'online' } }).then((users) => {
                res.render(`chat`, { title: 'chat', user: user, users: users[0].name});
            }).catch((err) => {
                console.log(err);
            });
            user.updateAttributes({
                status: 'online'
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    
});

io.on('connection', (client) => {
   
        client.on('getMsg', (data) => {
            console.log(data);
            io.sockets.emit('newMsg', {name: data.name, msg: data.msg });
            let newMsg = new mongodb(data);
            newMsg.save().then(() => {
                console.log("ok");
            }).catch((err) => {
                console.log(err);
            });
        })
});



module.exports = router;