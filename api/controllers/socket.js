module.exports.controller = (server) => {
     var io = require('socket.io').listen(server);
     var mailer = require('../controllers/nodeMailer');
     var mongoose = require('mongoose');
     var Users = mongoose.model('User');

     var users = []; // variables to hold the inofrmation of the user and admins logged in at a time. currently it is not used in the code
     var admins = [];// But they are just storing the information if needed in future updates

     var addProfile = (profile) => { // function to add the user/admin profile to specific arrays declared above
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
          }else if (profile.batch === 'User') {
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

     var generateOTP = () => { // function to generate the otp while the change password process
          {
               var text = "";
               var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

               for (var i = 0; i < 5; i++)
               text += possible.charAt(Math.floor(Math.random() * possible.length));

               return text;
          }
     }

     io.sockets.on('connection', (socket) => {
          var myself;   // to hold the information of the user logged in using the connection
          var timerId; // to heold the setInterval ID for stopping the function if user submit the test before time ends
          var otp;          // variable to hold OTP
          var otpCounter = 0; // counter to see that otp is sent only 3 times in a session

          var timer = (time) => {           // timer to sync the test clock to the server
               var countdown = time*60;
               var timer = () => {
                    countdown--;
                    io.sockets.in(myself.email).emit('timer', countdown);
                    if (countdown === 0) {
                         io.sockets.in(myself.email).emit('submit test');
                    }
               }
               timerId = setInterval(timer, countdown);
          }

          socket.on('add user', (profile) => {
               myself = profile;
               socket.join(myself.email);
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
               if (otpCounter === 0) {
                    timer(timeLimit);
                    otpCounter = 2;
               }
          });

          socket.on('stop timer', () => {
               clearInterval(timerId);
          });

          socket.on('sentNotification', (email) => {
               otpCounter = otpCounter + 2;
               Users.findOne({'local.email': email}, (err, user)=> {
                    if(err) {
                         console.log(err);
                         return;
                    };
                    if (user != null && otpCounter === 2) {
                         otp = generateOTP();
                         var msg = 'Your OTP for BuildMeUp account is '+ otp + '.';
                         mailer.mail(email, msg);
                         io.sockets.emit('successSentNotification');
                    }else if (user === null && otpCounter === 2) {
                         io.sockets.emit('unsuccessSentNotification');
                    }

                    if (user != null && otpCounter >= 2) {
                         var msg = 'Your OTP for BuildMeUp account is '+ otp + '.';
                         mailer.mail(email, msg);
                    }
               });


          });

          socket.on('submitOTP', (otpSubmitted) => {
               if (otpSubmitted === otp) {
                    io.sockets.emit('successOTPSubmittion');
               }else {
                    io.sockets.emit('unsuccessOTPSubmittion');
               }
          });
     })
}
