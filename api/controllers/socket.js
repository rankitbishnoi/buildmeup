module.exports.controller = (server) => {
     var io = require('socket.io').listen(server);
     //var mailer = require('../controllers/nodemailer');
     //var mongoose = require('mongoose');
     //var Users = mongoose.model('User');

     var users = [];
     var admins = [];

     var addProfile = (profile) => {
          var counter = 0;
          if (profile.batch === 'Admin') {
               admins.forEach((admin) => {
                    if (admin.email === profile.email) {
                         counter = 1;
                    }
               });
               if (counter === 0) {
                    admins.push(profile);
                    return 'Admin';
               }
          }else if (profile.batch ==== 'User') {
               users.forEach((user) => {
                    if (user.email === profile.email) {
                         counter = 1;
                    }
               });
               if (counter === 0) {
                    users.push(profile);
                    return 'User';
               }
          }else {
               console.log('profile sent by socket is not valid' + profile);
               return false;
          }
     }
/*
     var checkAccount = (email) => {
          Users.findOne({'email': email}, (err, user)=> {
               if(err) {
                    console.log(err);
                    return;
               };
               if (user === undefined || user.length === 0) {
                    return 'notFound';
               }else {
                    return 'true';
               }
          })
     }

     var generateOTP = () => {
          {
               var text = "";
               var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

               for (var i = 0; i < 5; i++)
               text += possible.charAt(Math.floor(Math.random() * possible.length));

               return text;
          }
     }*/

     io.sockets.on('connection', (socket) => {
          var myself;
          var timerId;
          var otp;

          var timer = (time) => {
               var countdown = timeLimit*60;
               var timer = () => {
                    countdown--;
                    io.sockets.in('User').emit('timer', { time: countdown });
                    if (countdown === 0) {
                         io.sockets.in('User').emit('submit test');
                    }
               }
               timerId = setInterval(timer, countdown);
          }

          socket.on('add user', (profile) => {
               myself = profile;
               socket.join('home');

               var connectionRoom = addProfile(profile);
               if (connectionRoom === 'Admin') {
                    socket.join('Admin');
                    io.sockets.in('home').emit('new admin online', admins);
               }else if (connectionRoom === 'User') {
                    socket.join('User');
                    io.sockets.in('home').emit('new user online', users);
               };
          });

          socket.on('start exam time', (timeLimit) => {
               timer(timeLimit);
          });

          socket.on('stop timer', () => {
               clearInterval(timerId);
          });
/*
          socket.on('sentNotification', (email) => {
               if (checkAccount(email) === true) {
                    otp = generateOTP();
                    var msg = 'Your OTP for BuildMeUp account is '+ otp + '.';
                    mailer.mail(email, msg);
                    io.sockets.emit('successSentNotification');
               }else if (checkAccount(email) === 'notFound') {
                    io.sockets.emit('unsuccessSentNotification');
               }
          });

          socket.on('submitOTP', (otpSubmitted) => {
               if (otpSubmitted === otp) {
                    io.sockets.emit('successOTPSubmittion');
               }else {
                    io.sockets.emit('unsuccessOTPSubmittion');
               }
          });
          */
     }
}
