const nodemailer = require('nodemailer');

var mongoose = require('mongoose');


const transport = nodemailer.createTransport({
     service: 'Gmail',
     auth: {
          user: 'xxxxxxxxxxx@gmail.com', // put your own Id here
          pass: 'myGmailPassword',             // put the password here
     },
});

var sendEmail = (to, message) =>{            // function to send the emails
     const mailOptions = {
          from: 'xxxxxxxxxxxxxxxxx@gmail.com',            // put your own id here
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

module.exports.mail = (reciever, msg) => {             //function to recieve all the Notification sendind calls from other controllers

     sendEmail(reciever, msg);
}
