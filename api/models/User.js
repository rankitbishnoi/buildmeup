var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
     local            : {
        email        : String,
        name         : String
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
   },
     batch: String,
     hash: String,
     salt: String,
     registeredOn: Date,
     lastLogin: Date,
     adminComments: String,
     avgScore: Number,
     testTaken: [
                    {
                         testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
                         name: String,
                         attemptedQuestions: Number,
                         totalQuestions: Number,
                         timeTaken: Number,
                         answers: [{ qId: String, markedOption: Number}],
                         correct: Number,
                         takenOn : Date,
                         Score: Number
                    }
     ]
});

userSchema.methods.setPassword = function(password){           // schema method to encrypt the password while registering the user
     this.salt = crypto.randomBytes(16).toString('hex');
     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {          // schema method to verify the password provided by the user while logging in
     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
     return this.hash === hash;
};

userSchema.methods.generateJwt = function(loginStrategy) {                // schema to generate the JWT using jsonwebtoken npm
     var expiry = new Date();
     expiry.setDate(expiry.getDate() + 7);

     if (loginStrategy === 'local') {
          return jwt.sign({
               _id: this._id,
               email: this.local.email,
               name: this.local.name,
               batch: this.batch,
               exp: parseInt(expiry.getTime() / 1000),
          }, "MY_SECRET");
     }else if (loginStrategy === 'facebook') {
          return jwt.sign({
               _id: this._id,
               email: this.facebook.email,
               name: this.facebook.name,
               batch: this.batch,
               exp: parseInt(expiry.getTime() / 1000),
          }, "MY_SECRET");
     }else if (loginStrategy === 'twitter') {
          return jwt.sign({
               _id: this._id,
               email: this.twitter.username,
               name: this.twitter.displayName,
               batch: this.batch,
               exp: parseInt(expiry.getTime() / 1000),
          }, "MY_SECRET");
     }else if (loginStrategy === 'google') {
          return jwt.sign({
               _id: this._id,
               email: this.google.email,
               name: this.google.name,
               batch: this.batch,
               exp: parseInt(expiry.getTime() / 1000),
          }, "MY_SECRET");
     }

};

mongoose.model('User', userSchema);
