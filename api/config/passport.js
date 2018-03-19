var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var configAuth = require('./auth');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));

var fbStrategy = configAuth.facebookAuth;
passport.use(new FacebookStrategy(fbStrategy,
function(req, token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

         User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
            if (err)
               return done(err);

            if (user) {

               // if there is a user id already but no token (user was linked at one point and then removed)
               if (!user.facebook.token) {
                   user.facebook.token = token;
                   user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                   user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                   user.save(function(err) {
                       if (err)
                            return done(err);

                       return done(null, user);
                   });
               }

               return done(null, user); // user found, return that user
            } else {
               // if there is no user, create them
               var newUser            = new User();

               newUser.facebook.id    = profile.id;
               newUser.facebook.token = token;
               newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
               newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

               newUser.save(function(err) {
                   if (err)
                       return done(err);

                   return done(null, newUser);
               });
            }
       });
    });

}));

passport.use(new GoogleStrategy({

    clientID        : configAuth.googleAuth.clientID,
    clientSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL,
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

},
function(req, token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

         User.findOne({ 'google.id' : profile.id }, function(err, user) {
             if (err)
                 return done(err);

             if (user) {

                 // if there is a user id already but no token (user was linked at one point and then removed)
                 if (!user.google.token) {
                     user.google.token = token;
                     user.google.name  = profile.displayName;
                     user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                     user.save(function(err) {
                         if (err)
                             return done(err);

                         return done(null, user);
                     });
                 }

                 return done(null, user);
             } else {
                 var newUser          = new User();

                 newUser.google.id    = profile.id;
                 newUser.google.token = token;
                 newUser.google.name  = profile.displayName;
                 newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                 newUser.save(function(err) {
                     if (err)
                         return done(err);

                     return done(null, newUser);
                 });
             }
         });

    });

}));
