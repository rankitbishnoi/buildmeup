myapp.service('forgotPassword', ['$http', '$rootScope', function($http, $rootScope) {
     var self = this;

     $rootScope.$on('sentNotification', (email) => {

     });

     $rootScope.$on('submitOTP', (otp) => {

     });

     $rootScope.$on('newPassword', (password)=> {

     });
}])
