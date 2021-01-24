const  LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


module.exports = function (passport){

  //used to serialize user
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
    function(req, username, password, done) {
      process.nextTick(function() {

        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                return done(err);
            if (user) { //if user exists, send flash message back to user to inform them
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {//otherwise, create a new user in the database

                let newUser      = new User();
                newUser.username = username;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

    });
    }
  ));

  passport.use('local-login', new LocalStrategy({
      passReqToCallback: true
    },
    function(req, username, password, done) { // callback with username and password from our form


      User.findOne({ 'username' :  username }, function(err, user) {
          if (err)
              return done(err);

          if (!user)
              return done(null, false, req.flash('loginMessage', 'No user found.'));

          if (!user.validPassword(password))
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

          return done(null, user);
      });
    }
  ));
};