var mongoose = require('mongoose');
var Users = mongoose.model('User');

var response = require('../helpers/responseSender.js');


module.exports.updateTestOnUser = (req, res) => {

}

module.exports.getUserTestDetails = (req, res) => {
     Users.findOne({'_id': req.query.id}, (err, user) => {
          if(err) {
               sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          res.status(200);
          res.json(user.testTaken);
     })
}

module.exports.getUserListForAdmin = (req, res) => {
     Users.find({}, (err, list) => {
          if(err) {
               sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          var userList = [];
          list.forEach((user) => {
               var obj = {};
               obj.name = user.local.name || user.facebook.name || user.google.name;
               obj.email = user.local.email || user.facebook.email || user.google.email;
               obj.status = 'offline';
               userList.push(obj);
          });
          res.status(200);
          res.json(userList);
     });
}

module.exports.getTopStudents = (req, res) => {
     Users.find().sort({'avgScore' : 1}).limit(10).exec(function (err, list) {
          if(err) {
               sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          var userList = [];
          list.forEach((user) => {
               var obj = {};
               obj.name = user.local.name || user.facebook.name || user.google.name;
               obj.performance = user.avgScore;
               userList.push(obj);
          });
          res.status(200);
          res.json(list);
     });
}

module.exports.getUserTestsData = (req, res) => {
     Users.findOne({'_id': req.query.id}, (err, user) => {
          if(err) {
               sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          var obj = { adminComments: user.adminComments, avgScore: user.avgScore, noOfTestTaken: user.testTaken.length};
          res.status(200);
          res.json(obj);
     })
}

module.exports.getAllUserData = (req, res) => {
     Users.findOne({'_id': req.query.id}, (err, user) => {
          if(err) {
               sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          res.status(200);
          res.json(user);
     })
}

module.exports.saveAdminComments = (req, res) => {
     Users.findOne({'_id': req.body.id}, (err, user) => {
          if(err) {
               sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };

          user.adminComments = req.body.adminComments;
          user.save((err) => {
               if(err) {
                    sendJSONresponse(res, 400, {
                         "message": "Something is Wrong. We are working it out. Try again."
                    });
                    return;
               };
               res.status(200);
               res.json("Request Successfull.");
          })
     })
}

module.exports.changePassword = (req, res) => {

}
