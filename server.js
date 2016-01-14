var express       = require("express");
var app           = express();
var path          = require("path");
var bodyParser    = require("body-parser");
var mysql         = require('mysql');
var Sequelize     = require('sequelize');
var passport      = require('passport');
var flash         = require('connect-flash');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var LocalStrategy = require('passport-local').Strategy;


//logger
var logger     = require('morgan');
var logDirectory = __dirname + '/log';
var FileStreamRotator = require('file-stream-rotator');
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
});

// session konfiguracija
app.use(session({ secret: 'secret',
                  resave: true,
                  saveUninitialized: true
                }));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // connect flash za sporocila 
app.use(cookieParser());
app.use(logger('combined', {stream: accessLogStream}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


require('./routes/router')(app, passport);
require('./controllers/passport')(passport);

//ukaz
//sequelize-auto -h localhost -o "./models" -d database -u root -x testpwd -e mysql

var server = app.listen(3000, function () {
  var host = "localhost";
  var port = server.address().port;

  console.log('E-redovalnica na http://%s:%s', host, port);
});
