const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/test';
const db = require('mongoose');

db.connect(url, { useMongoClient: true });
db.Promise = global.Promise; 

module.exports = db;