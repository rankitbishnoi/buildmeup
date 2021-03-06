myapp.controller('loginCtrl',['$localStorage', '$state','$transitions','modalService','tokenValidation', 'socket', function ($localStorage, $state, $transitions, modalService, tokenValidation, socket) {
     var self = this;


//==================================token validation using service and changing the DOM accordingly ========================
     var tokenValidationResult = tokenValidation.validation();
     if (tokenValidationResult === false) {
          self.authBtn = 'LogIn';
          self.user = false;
          self.authFunction = () => {
               modalService.setParameters('login');
               modalService.modalFunction();
               $state.go('home');
          }
     }else {
          self.authBtn = 'LogOut';

          self.authFunction = () => {                                 // function to provide the functionality of logout, this will delete the token stored in localstorage and provide the user with login functionality again
               $localStorage.token = undefined;
               self.loginbtn = true;
               self.logoutbtn = false;
               $state.go('home');
               window.location.reload();
          }

//=============================================================================================================================

          self.user = true;
          self.userInfo = tokenValidationResult;
          modalService.setUserInfo(self.userInfo);
          socket.emit('add user', self.userInfo);
          if (self.userInfo.batch === 'Admin') {
               self.adminBtn = true;
          }else {
               self.adminBtn = false;
          }
     }


     self.stateBck = 'homebck';                               // intital body background class

     $transitions.onSuccess({}, ($transitions)=> {                   // to catch the successfull transition of state and change the background class of the body
          var current = $transitions.$to();
          if (current.name === 'home') {
               self.stateBck = 'homebck';
               self.brandColor = 'black';
          }else {
               self.stateBck = 'querybck';
               self.brandColor = 'white';
          }
     })

     //===========================socket================

     self.admins = [];
     self.students = [];

     socket.on('new admin online', (adminList) => {
          self.admins = adminList;
     });

     socket.on('new user online', (userList) => {
          self.students = userList;
     });

}]);
