var express = require('express');
var database = require('../controllers/database');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
      res.redirect('login');
    });

    app.get('/login', function(req, res) {
      res.render('login.ejs', { message: req.flash('loginMessage') });
    });




    //avtorizacija ob prijavi

    app.post('/login', passport.authenticate('local-login', {
       successRedirect : '/index', // redirect to the secure profile section
       failureRedirect : '/login', // redirect back to the signup page if there is an error
       failureFlash : true // allow flash messages
   }));

    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.get('/index', isLoggedIn, function(req, res) {
            res.render('index.ejs', {
                user : req.user // get the user out of session and pass to template
            });
            console.log("User:", req.user.username, "just logged in");
    });

    app.get('/ustno', isLoggedIn, function(req, res) {
            res.render('index-ustno.ejs', {
                user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/info', isLoggedIn, function(req, res) {
            res.render('info.ejs', {
                user : req.user // get the user out of session and pass to template
            });
    });

    app.get('/logout', function(req, res) {
                req.logout();
                res.redirect('/');
    });

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/index', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    

    app.post('/ustno-ocena', isLoggedIn, function(req, res){
      database.createGrade(req.body);
      var usr = req.body;
      console.log(usr);
    });

    app.post('/ustno-test', isLoggedIn, function(req, res) {
      var id = JSON.stringify(req.body);
      database.findClass(id[2]).then(function(data){
          res.json(data);
      });
    });

    app.post('/izostanek', isLoggedIn, function(req, res){


      multipleReq(req.body);

      /*
      async.forEach(jsonObj, function(obj, next){
        //var response = database.missingQuery(obj);
        database.missingQuery(obj, function(err, result){
          if (err) return next(err);
          next()
        });
      });*/
      //database.createMissing(req.body);
      //if(success == false) console.log("NOT SUCCEDED");
    });

    app.post('/dnevnik', isLoggedIn, function(req, res){
      database.findStudent(req.body).then(function(result){
        if(result == null) res.json(null);
      });
      database.createLog(req.body);
    });
}

function multipleReq(queries){
    var query;
    if(queries.length == 0){
      return;
    }
    query = queries.pop();
    database.missingQuery(query).then(function(result){
        multipleReq(queries);
    });
}


function isLoggedIn(req, res, next) {

    // če je uporabnik avtenticiran, nadaljuj
    if (req.isAuthenticated())
        return next();

    // če ni, redirect na home
    res.redirect('/');
}
