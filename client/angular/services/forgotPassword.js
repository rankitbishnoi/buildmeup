myapp.service('forgotPassword', ['$http', '$rootScope', function($http, $rootScope) {
     var self = this;

     self.sentNotification = (email) => {
          socket.emit('sentNotification', email);
     }

     self.submitOTP = (otp)=> {
          socket.emit('submitOTP', otp);
     };

     self.newPassword = (password, email) => {
          var data = { id: email, pass: password};
          $http.post('http://localhost:3000/api/changePassword', data).then( function successCallback(response){
               if (response.status === 200) {
                    $rootScope.$broadcast('successChangePassword');
               }
          }), function errorCallback(response){
               if (response.status === 400 || response.status === 401) {
                    console.log(response.data);
               }
          };
     }


     //============================socket================================


     socket.on('successSentNotification', () => {
          $rootScope.$broadcast('successSentNotification');
     });

     socket.on('unsuccessSentNotification', () => {
          $rootScope.$broadcast('unsuccessSentNotification');
     });

     socket.on('successOTPSubmittion', () => {
          $rootScope.$broadcast('successOTPSubmittion');
     });

     socket.on('unsuccessOTPSubmittion', () => {
          $rootScope.$broadcast('unsuccessOTPSubmittion');
     });
}])
