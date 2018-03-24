const nodemailer = require('nodemailer');

var mongoose = require('mongoose');


const transport = nodemailer.createTransport({
     service: 'Gmail',
     auth: {
          user: 'rankitgodara1@gmail.com', // put your own Id here
          pass: 'Jasmine@1',             // put the password here
     },
});

var sendEmail = (to, message) =>{            // function to send the emails
     const mailOptions = {
          from: 'rankitgodara1@gmail.com',            // put your own id here
          to,
          subject: 'Forgot Password BuildMeUp',
          html: message,
     };
     transport.sendMail(mailOptions, (error) => {
          if (error) {
               console.log(error);
          }
     });
};

module.exports.mail = (reciever, msg) => {             //function to send the otp to the user

     sendEmail(reciever, msg);
}
