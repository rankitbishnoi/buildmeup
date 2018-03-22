var mongoose = require('mongoose');
var Users = mongoose.model('User');

var response = require('../helpers/responseSender.js');


module.exports.updateTestOnUser = (req, res) => {
     Users.findOne({'_id': req.body.id}, (err, user)=> {
          if(err) {
               response.sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          if (user.avgScore === undefined) { // to calculate the avgscore whenever user take a new test
               user.avgScore = 0;
               user.avgScore = (((user.avgScore*user.testTaken.length)+req.body.testTaken.score)/(user.testTaken.length+1));
          }else {
               user.avgScore = (((user.avgScore*user.testTaken.length)+req.body.testTaken.score)/(user.testTaken.length+1));
          }
          user.testTaken.push(req.body.testTaken);
          user.save((err) => {
               if(err) {
                    console.log(err);
                    response.sendJSONresponse(res, 400, {
                         "message": "Something is Wrong. We are working it out. Try again."
                    });
                    return;
               };
               res.status(200);
               res.json("Request Successfull.");
          })
     });
}

module.exports.getUserTestDetails = (req, res) => {
     Users.findOne({'_id': req.query.id}, (err, user) => {
          if(err) {
               response.sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          res.status(200);
          res.json(user.testTaken);
     })
}

module.exports.getUserListForAdmin = (req, res) => {
     Users.find({'batch': 'User'}, (err, list) => {
          if(err) {
               response.sendJSONresponse(res, 400, {
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
     Users.find({'batch': 'User'}).sort({'avgScore' : 1}).limit(10).exec(function (err, list) {
          if(err) {
               response.sendJSONresponse(res, 400, {
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
          res.json(userList);
     });
}

module.exports.getUserTestsData = (req, res) => {
     Users.findOne({'_id': req.query.id}, (err, user) => {
          if(err) {
               response.sendJSONresponse(res, 400, {
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
     Users.findOne({'email': req.query.id}, (err, user) => {
          if(err) {
               response.sendJSONresponse(res, 400, {
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
               response.sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };

          user.adminComments = req.body.adminComments;
          user.save((err) => {
               if(err) {
                    response.sendJSONresponse(res, 400, {
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
     Users.findOne({'local.email': req.body.id}, (err, user) => {
          if(err) {
               response.sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          user.setPassword(req.body.pass);
          user.save((err) => {
               if(err) {
                    response.sendJSONresponse(res, 400, {
                         "message": "Something is Wrong. We are working it out. Try again."
                    });
                    return;
               };
               res.status(200);
               res.json("Request Successfull.");
          })
     })
}
