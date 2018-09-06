var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session'); // NDV
var logger = require('morgan');

var indexRouter = require('./routes/index'); // NDV
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/stylesheets",express.static(__dirname + "/stylesheets"));// định nghĩa 1 đường dẫn riêng để đề phòng nhiều level sẽ bị lỗi
app.use("/javascripts",express.static(__dirname + "/javascripts"));
//app.use("/images",express.static(__dirname + "/images"));
// NDV
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
  
  // dung https ... cookie: { secure: true }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.fakedata = require('./model/jsondata.json'); // NDV

module.exports = app;
