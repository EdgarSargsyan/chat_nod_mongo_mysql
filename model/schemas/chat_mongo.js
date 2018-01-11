const db = require('../db_mongo.js');

const ChatSchema = new db.Schema({
    auter:{
        type: String
    },
    data:{
        type:Date,
        default:Date.now()
    },
    message:{
        type:String
    }
});



const Chat = db.model('chat', ChatSchema);

module.exports = Chat;