var LocalStrategy   = require('passport-local').Strategy;
var Sequelize  = require('sequelize');
//var bodyParser = require("body-parser");


var sequelize = new Sequelize('mydb', 'root', 'testpwd', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

var User = sequelize.import('../models/professors.js');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.professor_id);
  });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findOne({
      where: {
        professor_id: id,
      }
    }).then(function(user){
      done(null, user);
    }).catch(function(err){
      done(err, null);
    });
  });




  //LOGIN
  passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password, done) {
      if (username)
            username = username.toLowerCase();

      process.nextTick(function() {
              User.findOne({where: { username :  username }}).then( function(user){
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Uporabnik ne obstaja.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Ups! Napacno geslo.'));
                // return user
                else
                    return done(null, user);
              }).catch(function(err){
                console.log("asd");
                return done(err);
              });
      });
    }));

    //SIGNUP

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password, done) {
        if (username)
            username = username.toLowerCase(); //vsi usernami lowcasani

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({where: { username :  username }}).then(function(user){
                  if (user) {
                      return done(null, false, req.flash('signupMessage', 'Uporabnisko ime je ze zasedeno.'));
                  } else {

                      var count = 0;
                      User.findAll().then(function(arr){
                        count = arr.length + 1;
                        var newUser = User.build({professor_id: count, username: username});
                        newUser.email = req.body.email;
                        newUser.ime = req.body.ime;
                        newUser.priimek = req.body.priimek;
                        newUser.password = newUser.generateHash(password);
                        newUser.save().then(function(usr){
                          console.log("saved");
                          return done(null, newUser);
                        }).catch(function(err){
                          return done(err);
                        });
                      });
                      // create the user

                  }
                }).catch(function(err){
                  console.log(err);
                  return done(err);
                });
            } else {
                console.log("noooo");
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }));

};
