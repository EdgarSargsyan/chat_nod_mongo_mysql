const express = require("express");
const router = express.Router();

const mongodb = require('../model/schemas/chat_mongo.js');
const mysql = require('../model/schemas/users_mysql.js');


router.get("/", (req, res, next) => {
	// console.log(req.cookies);
	// console.log(req.session);
	res.render(`index`, { title: "Registration form" });
});



router.post("/regist", (req, res, next) => {
	let data = {
		"name": req.body.name,
		"surname": req.body.surname,
		"email": req.body.email,
		"gender": req.body.gender,
		"password": req.body.password
	};
	mysql.sync({ force: false }).then(() => {
		mysql.create(data);
		res.send(req.body);
	}).catch((err) => {
		console.log(err);
	});

});


router.post("/forget", (req, res, next) => {
	console.log(req.body);
	let data = {
		"email": req.body.email,
		"password": req.body.password
	};
	mysql.findOne({ where: { email: data.email } }).then((user) => {
		if (user != null) {
			console.log(user.dataValues);
			user.updateAttributes({
				password: data.password
			});

		}
		else {
			res.render(`users`, { title: "Registration form", user: "Incorrect email" });
		}
	}).catch((err) => {
		console.log(err);
	});


});

// router.post("/login", (req, res, next) => {
// 	console.log(req.body);
// 	User.findOne({"email":`${req.body.email}`}, function(err, docs){
// 		let loginInfo = {};
// 		if(err) throw err;
// 		if(docs != null){
// 			if(docs.checkPassword(req.body.password)){
// 				req.session.name = docs._id;
// 				// loginInfo.user = docs;
// 				res.redirect('/users');
// 			}

// 			else{
// 				req.session.name = ""
// 				loginInfo.passErr = "Incorrect password";
// 			}
// 		// }else{
// 		// 	loginInfo.emailErr = "Incorrect email";

// 		// }

// 		// res.send(loginInfo);
// 		}
// 	})
// });










module.exports = router;