var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var routes = require('./routes/index');
var department = require('./routes/department');
var division = require('./routes/division');
var facultyMember = require('./routes/facultyMember');
var location = require('./routes/location');
var semester = require('./routes/semester');
var student = require('./routes/student');
var subject = require('./routes/subject');
var timeline = require('./routes/timeline');
var transcript = require('./routes/transcript');
var users = require('./routes/users');
var cPanel = require('./routes/cPanel');
var report = require('./routes/report');
var cutingStudent = require('./routes/cutingStudent');
var studentshow = require('./routes/studentshow');
var subjectOfDagree = require('./routes/subjectOfDagree');
var credence = require('./routes/credence');

// var redis = require("redis"),
//     client = redis.createClient();
// var RedisStore = require('connect-redis')(session);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'naga_app',resave: true,saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/department', department);
app.use('/division', division);
app.use('/facultyMember', facultyMember);
app.use('/location', location);
app.use('/semester', semester);
app.use('/student', student);
app.use('/subject', subject);
app.use('/timeline', timeline);
app.use('/transcript', transcript);
app.use('/users', users);
app.use('/cPanel', cPanel);
app.use('/report', report);
app.use('/cutingStudent', cutingStudent);
app.use('/studentshow', studentshow);
app.use('/subjectOfDagree', subjectOfDagree);
app.use('/credence', credence);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

module.exports = app;
