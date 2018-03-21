var mongoose = require('mongoose');
var Tests = mongoose.model('Test');

var response = require('../helpers/responseSender.js');

module.exports.createTest = (req, res) => {
     if (req.body._id === undefined) {
          var test = new Tests({
               name: req.body.name,
               description: req.body.description,
               timeLimit: req.body.timeLimit,
               subject: req.body.subject,
               questions: req.body.questions,
               admin: {
                    id: req.body.admin.id,
                    name: req.body.admin.name
               },
               availability: true
          });

          test.save((err) => {
               if(err) {
                    response.sendJSONresponse(res, 400, {
                         "message": "Something is Wrong. We are working it out. Try again."+err
                    });
                    return;
               };
               res.status(200);
               res.json("Request Successfull.");
          })

     }else {
          Tests.findOne({'_id': req.body._id}, (err, test) => {
               test.name = req.body.name;
               test.description = req.body.description;
               test.timeLimit = req.body.timeLimit;
               test.subject = req.body.subject;
               test.questions = req.body.questions;
               test.admin = req.body.admin;
               test.availability = true;

               test.save((err) => {
                    if(err) {
                         response.sendJSONresponse(res, 400, {
                              "message": "Something is Wrong. We are working it out. Try again."+err
                         });
                         return;
                    };
                    res.status(200);
                    res.json("Request Successfull.");
               })
          });
     }




}

module.exports.deleteTest = (req, res) => {
     Tests.findOne({'_id': req.body.id}, (err, test) => {
          test.availability = false;

          test.save((err) => {
               if(err) {
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

module.exports.getAdminTestList = (req, res) => {
     Tests.find({'admin.id': req.body.id}, (err, testList) => {
          if(err) {
               response.sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          res.status(200);
          res.json(testList);
     });
}

module.exports.fetchSubjectList = (req, res) => {
     Tests.aggregate().match({'availability': true}).group({_id : '$subject',count: {$sum: 1}}).exec(function (err, list) {
          if(err) {
               response.sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          res.status(200);
          res.json(list);
     });
}

module.exports.getTestList = (req, res) => {
     Tests.find({'availability': true}).sort({'_id': -1}).exec(function (err, list) {
          if(err) {
               response.sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          res.status(200);
          res.json(list);
     });
}

module.exports.fetchSubjectTests = (req, res) => {
     Tests.find({'subject': req.query.name, 'availability': true}).sort({'_id': -1}).exec(function (err, list) {
          if(err) {
               response.sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          res.status(200);
          res.json(list);
     });
}

module.exports.getTotalNoOfTests = (req, res) => {
     Tests.count({}, (err, test) => {
          if(err) {
               response.sendJSONresponse(res, 400, {
                    "message": "Something is Wrong. We are working it out. Try again."
               });
               return;
          };
          res.status(200);
          res.json(tests);
     });
}
