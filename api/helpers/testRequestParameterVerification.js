var response = require('./responseSender.js');

module.exports.createTestParams = (req, res, next) => {
     if (req.body.name === undefined || req.body.subject === undefined || req.body.description === undefined || req.body.timeLimit === undefined || req.body.admin.id === undefined || req.body.admin.name === undefined || req.body.questions === undefined) {
          response.sendJSONresponse(res, 401, {
               "message": "Please provide all the data for test paper"
          });
          return;
     }else {
          req.body.timeLimit = parseInt(req.body.timeLimit);
          next();
     }
}

module.exports.deleteTestParams = (req, res, next) => {
     if (req.body.id === undefined) {
          response.sendJSONresponse(res, 401, {
               "message": "The testID is missing."
          });
          return;
     }else {
          next();
     }
}

module.exports.getAdminTestListParams = (req, res, next) => {
     if (req.body.id ===  undefined) {
          response.sendJSONresponse(res, 401, {
               "message": "The adminID is missing."
          });
          return;
     }else {
          next();
     }
}
