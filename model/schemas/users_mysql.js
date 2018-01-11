const db = require('../db_mysql.js');
const Sequelize = require('sequelize');
const getHash = require('../getPasswordHash');

var User = db.define('user', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },

    name: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    surname: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    gender:{
        type: Sequelize.STRING,
        notEmpty: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    salt: {
        type: Sequelize.STRING
    },
    password_hash: {
        type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
    },
    password: {
        type: Sequelize.VIRTUAL ,
        set: function (val) {
           let salt = String(Math.random());
           console.log(typeof val);
           console.log(typeof salt);
           console.log(getHash(val, salt));
           this.setDataValue('salt', salt);
           this.setDataValue('password_hash', getHash(val, salt));
         }
    },
    status: {
        type: Sequelize.ENUM('online', 'offline'),
        defaultValue: 'offline'
    }
});

module.exports = User;