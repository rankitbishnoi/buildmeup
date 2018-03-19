myapp.service('modalService', ['$uibModal','$log','$document','$http','$state','$rootScope', function($uibModal, $log, $document, $http, $state, $rootScope){
     var self= this;

     self.setUserInfo = (user) => {
          self.userInfo = user;
     }

     self.setAdminComments = (adminComments) => {
          self.adminComments = adminComments;
     }

     self.setDummyMessage = (message) => {
          self.dummymsg = message;
     }

     self.setParameters = (modalType) => {
          if (modalType === 'login') {
               self.templateUrl = "../views/modal/loginModal.html";
               self.controller = self.loginCtrl;
               self.size = 'md';
          }else if (modalType === 'register'){
               self.templateUrl = "../views/modal/registerModal.html";
               self.controller = self.registerCtrl;
               self.size = 'md';
          }else if (modalType === 'newTest') {
               self.templateUrl = "../views/modal/newTestModal.html";
               self.controller = self.newTestCtrl;
               self.size = 'md';
          }else if (modalType === 'loginFirst') {
               self.templateUrl = "../views/modal/loginFirstError.html";
               self.controller = self.loginFirstCtrl;
               self.size = 'sm';
          }else if (modalType === attemptedTest) {
               self.templateUrl = "../views/modal/attemptedTestModal.html";
               self.controller = self.attemptedTestCtrl;
               self.size = 'md';
          }else if (modalType === 'deleteQuestion') {
               self.templateUrl = "../views/modal/deleteQuestionModal.html";
               self.controller = self.deleteQuestionCtrl;
               self.size = 'sm';
          }else if (modalType === 'testInstructions') {
               self.templateUrl = "../views/modal/testInstructionsModal.html";
               self.controller = self.testInstructionsCtrl;
               self.size = 'md';
          }else if (modalType === 'forgotPassword') {
               self.templateUrl = "../views/modal/forgotPasswordModal1.html";
               self.controller = self.forgotPasswordCtrl;
               self.size = 'md';
          }else if (modalType === 'editAdminComments') {
               self.templateUrl = "../views/modal/adminCommentsModal.html";
               self.controller = self.editAdminCommentsCtrl;
               self.size = 'md';
          }else if (modalType === 'dummyModal') {
               self.templateUrl = "../views/modal/dummyModal.html";
               self.controller = self.dummyCtrl;
               self.size = 'md';
          }
     }

     self.setParametersForNewtest = (test) => {
          self.newTest = test;
     }

     self.setParametersForAttemptedtest = (test) => {
          self.attemptedTest = test;
     }

     self.animationsEnabled = true;
     self.modalFunction = function (size, parentSelector) {             // function to open the login modal
          $uibModal.open({
               animation: self.animationsEnabled,
               ariaLabelledBy: 'modal-title-bottom',
               ariaDescribedBy: 'modal-body-bottom',
               templateUrl: self.templateUrl,
               size: self.size,
               controller: self.controller

          }).result.catch(function (resp) {                                       // to stop all the error like clicking outside the modal area on screen
               if (['cancel', 'backdrop click', 'escape key press'].indexOf(resp) === -1) throw resp;
          });
     };



     self.loginCtrl = function($scope,$uibModalInstance,$localStorage,$state) {      // modal controller

          $scope.loginNow = function (){              // function will intitate the login process
               $scope.error = undefined;             // varibale to hold the login error, which is initally undefined.
               if ($scope.lemail === 'Email' || $scope.lpassword === 'password' || $scope.lemail === null || $scope.lpassword === null || $scope.lemail === undefined || $scope.lpassword === undefined ){         // condition to deterkine if all the requires inputs are there or not
                    $scope.error = 'Please enter valid Email id and password.';
                    $scope.lemail = '';
                    $scope.lpassword = '';
               } else {
                    var data = { email: $scope.lemail, password: $scope.lpassword};
                    $http.post('http://localhost:3000/api/login', data).then(function successCallback(response){     // http request to the server to login
                         if (response.status === 200) {              // condition to see if the request is successfull or not
                              $localStorage.token=response.data.token;                             // to store the token provided by the server
                              $scope.ok();
                              $state.transitionTo($state.current, $stateParams, {
                                   reload: true,
                                   inherit: false,
                                   notify: true
                              });
                         }

                         //what to do on success
                    },function errorCallback(err){
                         $scope.lemail = '';
                         $scope.lpassword = '';
                         if(err.status === 401) {
                              $scope.error = "Wrong Id or password. Please try again.";
                         }else if (err.status === 400) {
                              $scope.error = "Please Enter both id and password.";
                         }else if (err.status === 404) {
                              $scope.error = "Server is down. Please try after some time.";
                         }

                    });
               };
          };

          $scope.register = () => {                            // function to close the login modal and call the register odal
               $uibModalInstance.close();
               self.setParameters('register');
               self.modalFunction();
          }

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }

     self.registerCtrl = function($scope,$uibModalInstance,$localStorage,$state) {      // modal controller

          $scope.registerNow = function () {                             // function to initiate the registerring process
               var letters = /^[A-Za-z]+$/;                              // reges to check if only letters are present
               var letterNumber = /^[0-9a-zA-Z]+$/;                        // reges to see if only letters and numbers are present
               var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;         // reges to see if it is a valid emailid
               var number = /[0-9]/;                               // regex to see if there is one numbers in variable
               var lowercase = /[a-z]/;                           // regex to see if the letters provided have at least one lowercase
               var uppercase = /[A-Z]/;                                // regex to see if the letters provided have at least one uppercase
               $scope.rerror = undefined;                             // all the possible error that can arise during register process
               $scope.nameerror = undefined;
               $scope.emailerror = undefined;
               $scope.passworderror = undefined;
               $scope.confirmpassworderror = undefined;
               if ($scope.email === ' ' || $scope.password === ' ' || $scope.name === ' ' || $scope.username === ' '){       // condition to see all the error that con arrise and store them in error varibles accordingly
                    $scope.rerror = 'Please enter valid Email id and password.';
               }else if ($scope.email === 'email' || $scope.password === 'password' || $scope.name === 'name' || $scope.username === 'username'){
                    $scope.rerror = 'Please enter valid Data in Fields.';
               }else if (!$scope.name.match(letters)) {
                    $scope.nameerror = " Please use only alphabet characters.";
               }else if (!$scope.email.match(mailformat)) {
                    $scope.emailerror = " Please use valid email address.";
               }else if ($scope.password.length < 8) {
                    $scope.passworderror = " Please use password greater or equal to 8 characters.";
               }else if (!$scope.password.match(number)) {
                    $scope.passworderror = " Please use password with at least one numerical character.";
               }else if (!$scope.password.match(lowercase)) {
                    $scope.passworderror = " Please use password with at least one lowercase alphabatic character.";
               }else if (!$scope.password.match(uppercase)) {
                    $scope.passworderror = " Please use password with at least one uppercase alphabatic character.";
               }else if ($scope.password != $scope.confirmpassword) {
                    $scope.confirmpassworderror = 'The password do not match. Please type again.';
               }else {
                    var data = {
                         email: $scope.email,
                         password: $scope.password,
                         name: $scope.name,
                         batch: $scope.batch,
                    };                                            // http request to the server for registering with appropriate data
                    $http.post('http://localhost:3000/api/register', data).then(function successCallback(response){
                         // what to do when success
                         $localStorage.token=response.data.token;
                         $scope.ok();
                         $state.transitionTo($state.current, $stateParams, {
                              reload: true,
                              inherit: false,
                              notify: true
                         });

                    }, function errorCallback(err){
                         if (err.status === 400) {
                              $scope.rerror = "Please Enter both id and password.";
                         }
                    });
               }
          }

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }


     self.newTestCtrl = function($scope,$uibModalInstance, $state, $rootScope) {      // modal controller

          $scope.testData = self.newTest;

          if (self.userInfo.batch === 'Admin') {
               $scope.adminBtn = true;
          }else {
               $scope.adminBtn = false;
          }

          $scope.start = () => {
               $uibModalInstance.close();
               self.setParameters('testInstructions');
               self.modalFunction();
          }

          $scope.edit = () => {
               $rootScope.$broadcast('editNewTest', (self.newTest));
               $uibModalInstance.close();
               $state.go('createTest');
          }

          $scope.delete = () => {

          }


          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }

     self.attemptedTestCtrl = function($scope,$uibModalInstance) {      // modal controller

          $scope.testData = self.attemptedTest;


          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }

     self.loginFirstCtrl = function($scope,$uibModalInstance) {      // modal controller

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }

     self.deleteQuestion = function($scope,$uibModalInstance, $rootScope) {      // modal controller

          $scope.delete = () => {
               $rootScope.$broadcast('deleteQuestion');
          }

          $scope.ok = () => {                                      // function to close the modal
               $rootScope.$broadcast('deleteQuestionRejected');
               $uibModalInstance.close();
          };
     }

     self.testInstructionsCtrl = function($scope,$uibModalInstance, $state) {      // modal controller

          $scope.terms = false;

          $scope.start = () => {
               if ($scope.terms === true) {
                    $state.go('exam');
               }
          }

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }

     self.forgotPasswordCtrl = function($scope,$uibModalInstance) {      // modal controller

          $scope.cancelOkBtn = "Cancel";
          $scope.email = '';
          $scope.error = undefined;
          $scope.otp = '';
          var otpCounter = 0;

          $scope.sentNotification = () => {
               $rootScope.$broadcast('sentNotification', $scope.email);
               otpCounter++;
          }

          $scope.sentOTP = () => {
               if (otpCounter >= 4) {
                    $scope.error = "You can only sent otp 3 times in one session."
               }else {
                    $rootScope.$broadcast('sentNotification', $scope.email);
                    otpCounter= otpCounter + 2;
               }
          }

          $scope.submitOTP = () => {
               $rootScope.$broadcast('submitOTP', $scope.otp);
          }

          $scope.submitNewPassword = () => {
               var number = /[0-9]/;                               // regex to see if there is one numbers in variable
               var lowercase = /[a-z]/;                           // regex to see if the letters provided have at least one lowercase
               var uppercase = /[A-Z]/;                                // regex to see if the letters provided have at least one uppercase
               if ($scope.passwordF.length < 8) {
                    $scope.error = " Please use password greater or equal to 8 characters.";
               }else if (!$scope.passwordF.match(number)) {
                    $scope.error = " Please use password with at least one numerical character.";
               }else if (!$scope.passwordF.match(lowercase)) {
                    $scope.error = " Please use password with at least one lowercase alphabatic character.";
               }else if (!$scope.passwordF.match(uppercase)) {
                    $scope.error = " Please use password with at least one uppercase alphabatic character.";
               }else if ($scope.passwordF != $scope.confirmpasswordF) {
                    $scope.error = 'The password do not match. Please type again.';
               }else {
                    $rootScope.$broadcast('newPassword', $scope.passwordF);
               }

          }

          $rootScope.$on('successSentNotification', () => {

               $scope.error = undefined;
               if (otpCounter === 1) {
                    $uibModalInstance.close();
                    self.templateUrl = "../views/modal/forgotPasswordModal2.html";
                    self.controller = self.forgotPasswordCtrl;
                    self.size = 'md';
                    self.modalFunction();
               }else {
                    $scope.error = "The otp has been sent 2nd time.";
               }
          });

          $rootScope.$on('unsuccessSentNotification', () => {
               $scope.eroor = "No such User is found with this email address";
          });

          $rootScope.$on('successOTPSubmittion', () => {
               $scope.error = undefined;
               $uibModalInstance.close();
               self.templateUrl = "../views/modal/forgotPasswordModal3.html";
               self.controller = self.forgotPasswordCtrl;
               self.size = 'md';
               self.modalFunction();
          });

          $rootScope.$on('unsuccessOTPSubmittion', () => {
               $scope.error = "The submitted OTP is wrong. Please try again."
          });

          $rootScope.$on('successChangePassword', () => {
               $scope.error = "The password has been succefully updated. Please login using new password.";
               $scope.cancelOkBtn = "Ok";
          })

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }

     self.editAdminCommentsCtrl = function($scope,$uibModalInstance) {      // modal controller

          $scope.adminComments = self.adminComments;

          $scope.add = () => {
               $rootScope.$broadcast('addAdminComments', $scope.adminComments);
               $uibModalInstance.close();
          }

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }

     self.dummyCtrl = function($scope,$uibModalInstance) {      // modal controller

          $scope.message = self.dummymsg;

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }

}]);
