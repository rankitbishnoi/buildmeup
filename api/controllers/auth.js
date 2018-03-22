var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var updateLastLogin = (user) => { //to update the lastlogin whenever user/admin logsin.
     User.findOne({'_id': user._id}, (err, profile) => {
          profile.lastLogin = Date.now();
          profile.save(function(err) {
               if (err) {
                    console.log('Can not update the last login time of the userId: '+ profile._id)
               }
          });
     });
}


module.exports.register = (req, res) => {

     var user = new User();
     user.local.name = req.body.name;
     user.local.email = req.body.email;

     if (req.body.batch === 1234) { // this is the passkey admin should know to register deafult it is 1234, you can change it
          user.batch = 'Admin';
     }else{
          user.batch = 'User';
     };

     user.registeredOn = Date.now();

     user.setPassword(req.body.password);

     user.save(function(err) {
          var token;
          token = user.generateJwt('local');
          res.status(200);
          res.json({
               "token" : token
          });
     });
};

module.exports.localLogin = (req, res) => { 

     passport.authenticate('local', function(err, user, info){
          var token;

          // If Passport throws/catches an error
          if (err) {
               res.status(404).json(err);
               return;
          }

          // If a user is found
          if(user){
               token = user.generateJwt('local');
               updateLastLogin(user);
               res.status(200);
               res.json({
                    "token" : token
               });
          } else {
               // If user is not found
               res.status(401).json(info);
          }
     })(req, res);

};

module.exports.facebookLogin = (req, res) => {

     passport.authenticate('facebook', (err, user) => {
          // If Passport throws/catches an error
          if (err) {
               res.status(404).json(err);
               return;
          }

          // If a user is found
          if(user){
               token = user.generateJwt('facebook');
               updateLastLogin(user);
               res.status(200);
               res.json({
                    "token" : token
               });
          }
          })(req, res);
}

module.exports.googleLogin = (req, res) => {

         passport.authenticate('google', (err, user) => {
             // If Passport throws/catches an error
             if (err) {
                  res.status(404).json(err);
                  return;
             }

             // If a user is found
             if(user){
                  token = user.generateJwt('google');
                  updateLastLogin(user);
                  res.status(200);
                  res.json({
                       "token" : token
                  });
             }
             })(req, res);
}
