module.exports.controller = (server) => {
     var io = require('socket.io').listen(server);

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

     io.sockets.on('connection', (socket) => {
          var myself;
          var timerId;

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
     }
}
