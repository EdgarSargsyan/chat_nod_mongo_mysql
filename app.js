const express = require("express");
const app = express();
const morgan = require("morgan")
const bodyParser = require("body-parser");
const config = require('./config/index.js');
const ejs = require("ejs")
const ejsMate = require("ejs-mate");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const server = require('http').Server(app);
global.io = require('socket.io')(server);

const index = require("./routes/index");
const users = require("./routes/users");
const chat = require("./routes/chat");


app.set("views",`${__dirname}/views`);
app.set("view engine",config.get("view-engine"));

app.use(express.static(`${__dirname}/public`));
app.engine("ejs",ejsMate);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session({
  secret:"mySecretWord",
  key:"SESSION_ID",
  resave:true,
  saveUninitialized:true,
  cookie: {
    path:'/',
    maxAge: null ,
    httpOnly: true
  }
}));

app.use("/", index);
app.use("/users", users);
app.use("/chat", chat);



app.use((req,res,next)=>{
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});
app.use((err,req,res,next)=>{
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error")
});

// app.listen(config.get('port'),()=>{
//   console.log(`Server running on port 3000 ...`);
// });


server.listen(config.get('port'),()=>{
  console.log(`Server running on port 3000 ...`);
});
