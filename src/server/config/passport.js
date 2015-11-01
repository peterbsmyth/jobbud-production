// ---- require dependencies
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');

module.exports = function(passport) {
    console.log("accessed passport function");

    // ---- serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("accessed serializeUser");
        done(null, user.id);
    });

    // ---- deserialize the user
    passport.deserializeUser(function(id, done) {
      console.log("accessed deserialize");
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // ---- passport.js local signup
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true // pass back the entire request to the callback
    },
    function(req, email, password, done) {
        console.log("accessed callback");
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

          console.log('accessed process...');
          // find a user whose username is the same as the forms username
          // we are checking to see if the user trying to login already exists
          User.findOne({ 'local.email' :  email }, function(err, user) {
              console.log('accessed User.findOne...');
              // if there are any errors, return the error
              if (err){
                console.log(err);
                return done(err);
              }

              // check to see if theres already a user with that username
              if (user) {
                  console.log("user exists!");
                  return done(null, false, {message: 'That username is already taken.'});
              } else {
                  console.log('accessed make new user...');

                  // if there is no user with that username
                  // create the user
                  var newUser = new User();

                  // set the user's local credentials
                  newUser.local.email    = email;
                  newUser.local.password = newUser.generateHash(password);
                  newUser.local.isAdmin = false;

                  // save the user
                  newUser.save(function(err) {
                      if (err) {
                          throw err;
                      }
                      return done(null, newUser);
                  });
              }

          });

        });

    }));

    // ---- passport.js local signup
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true
    },
    function(req, email, password, done) { // callback with username and password from our form
        console.log("accessed login callback");

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err) {
                return done(err);
            }

            // if no user is found, return the message
            if (!user) {
                return done(null, false, {message: 'No user found.'});
            }

            // if the user is found but the password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Oops! Wrong password.'});
            }

            // all is well, return successful user
            return done(null, user);
        });
    }));
};
