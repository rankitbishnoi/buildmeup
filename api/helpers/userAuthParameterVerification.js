var response = require('./responseSender.js');
// to verify the parameters send by the client side to server before executing the appropriate function
module.exports.register = (req, res, next) => {
     if(!req.body.name || !req.body.email || !req.body.password) {
          response.sendJSONresponse(res, 400, {
               "message": "All fields required"
          });
          return;
     }else {
          req.body.email = req.body.email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching;
          next();
     }
}


module.exports.login = (req, res, next) => {
     if(!req.body.email || !req.body.password) {
       response.sendJSONresponse(res, 400, {
        "message": "All fields required"
       });
       return;
     }else {
          req.body.email = req.body.email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching;
          next();
     }
}
