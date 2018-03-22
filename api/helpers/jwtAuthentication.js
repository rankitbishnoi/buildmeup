var jwt = require('express-jwt');

module.exports.auth = jwt({              // middleware to verify the token provided by the user when he requests to the server.
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
