var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require ('cors');
const bcrypt = require('bcrypt');
var passport = require("passport");
const session = require('express-session');



// for MongoDB connection 4
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var app = express();
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(session({
  secret:'secret',
  maxAge:36000,
  resave:true,
  saveUninitialized:true,

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/user', require('./routes/user_info'));
app.use('/Client', require('./routes/Sys_Clients'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//connecting to MongoDB 
mongoose.connect('mongodb://admin:admin123@ds235658.mlab.com:35658/dashboard',{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
console.log('MonogDb is connected')
mongoose.connection.on('error', function (err) {
console.error('MongoDB connection error: ' + err);
process.exit(-1);
 });


//  mongoose.connect('mongodb://localhost:27017/dashboard');
//  console.log('local db is connected');
// // // // error handler


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// app.listen(port,()=>console.log('Server Started At Port',port));
module.exports = app;
