myapp.service('modalService', ['$uibModal','$log','$document','$http','$state','$rootScope', function($uibModal, $log, $document, $http, $state, $rootScope){
     var self= this;

     self.setUserInfo = (user) => {     // setting user informartion for modal
          self.userInfo = user;
     }

     self.setAdminComments = (adminComments) => {    // setting admins comment on the user for modal
          self.adminComments = adminComments;
     }

     self.setDummyMessage = (message) => {          // setting template for dummy modal which fwiil be used for warning , success, result other types of notifications
          self.dummymsg = message;
     }

     self.setResultOfUserTest = (result) => {          // setting result of the test given by user for result modal
          self.userResult = result;
     }

     self.setParameters = (modalType) => {          // setting the template, controller, size of the modal for specified modal
          if (modalType === 'login') {
               self.templateUrl = "../angular/views/modal/loginModal.html";
               self.controller = self.loginCtrl;
               self.size = 'md';
          }else if (modalType === 'register'){
               self.templateUrl = "../angular/views/modal/registerModal.html";
               self.controller = self.registerCtrl;
               self.size = 'md';
          }else if (modalType === 'newTest') {
               self.templateUrl = "../angular/views/modal/newTestModal.html";
               self.controller = self.newTestCtrl;
               self.size = 'md';
          }else if (modalType === 'loginFirst') {
               self.templateUrl = "../angular/views/modal/loginFirstError.html";
               self.controller = self.loginFirstCtrl;
               self.size = 'sm';
          }else if (modalType === 'attemptedTest') {
               self.templateUrl = "../angular/views/modal/attemptedTestModal.html";
               self.controller = self.attemptedTestCtrl;
               self.size = 'md';
          }else if (modalType === 'deleteQuestion') {
               self.templateUrl = "../angular/views/modal/deleteQuestionModal.html";
               self.controller = self.deleteQuestionCtrl;
               self.size = 'sm';
          }else if (modalType === 'testInstructions') {
               self.templateUrl = "../angular/views/modal/testInstructionsModal.html";
               self.controller = self.testInstructionsCtrl;
               self.size = 'md';
          }else if (modalType === 'forgotPassword') {
               self.templateUrl = "../angular/views/modal/forgotPasswordModal1.html";
               self.controller = self.forgotPasswordCtrl;
               self.size = 'md';
          }else if (modalType === 'editAdminComments') {
               self.templateUrl = "../angular/views/modal/adminCommentsModal.html";
               self.controller = self.editAdminCommentsCtrl;
               self.size = 'md';
          }else if (modalType === 'result') {
               self.templateUrl = "../angular/views/modal/resultModal.html";
               self.controller = self.resultCtrl;
               self.size = 'md';
          }else if (modalType === 'dummyModal') {
               self.templateUrl = "../angular/views/modal/dummyModal.html";
               self.controller = self.dummyCtrl;
               self.size = 'md';
          }
     }

     self.setParametersForNewtest = (test) => {                    // setting test details ofr the newtest modal
          self.newTest = test;
     }

     self.setParametersForAttemptedtest = (test) => {           // setting test details for the attempted test by the user
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

//================================================= Controllers for the modals specified above ==================================
// as all the code of controllers for different modals is less than 400 lines they are coded in single file here
// you can makes different files for them if more modularty is wanted but I think it will just make the directories litte more complicated



//===========================login modal controller=================================================

     self.loginCtrl = function($scope,$uibModalInstance,$localStorage,$state) {      // modal controller

          $scope.loginNow = function (){              // function will intitate the login process
               $scope.error = undefined;             // varibale to hold the login error, which is initally undefined.
               if ($scope.lemail === 'Email' || $scope.lpassword === 'password' || $scope.lemail === null || $scope.lpassword === null || $scope.lemail === undefined || $scope.lpassword === undefined ){         // condition to deterkine if all the requires inputs are there or not
                    $scope.error = 'Please enter valid Email id and password.';
                    $scope.lemail = '';
                    $scope.lpassword = '';
               } else {
                    var data = { email: $scope.lemail, password: $scope.lpassword};
                    $http.post('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/login', data).then(function successCallback(response){     // http request to the server to login
                         if (response.status === 200) {              // condition to see if the request is successfull or not
                              $localStorage.token=response.data.token;                             // to store the token provided by the server
                              $scope.ok();
                              $state.go('home');
                              window.location.reload();
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

          $scope.forgotPassword = () => {
               self.setParameters('forgotPassword');
               self.modalFunction();
               $uibModalInstance.close();
          }

          $scope.register = () => {                            // function to close the login modal and call the register odal
               self.setParameters('register');
               self.modalFunction();
               $uibModalInstance.close();
          }

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }




//==========================================register modal controller==========================================

     self.registerCtrl = function($scope,$uibModalInstance,$localStorage,$state) {      // modal controller

          $scope.registerNow = function () {                          // function to initiate the registerring process
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
                    $http.post('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/register', data).then(function successCallback(response){
                         // what to do when success
                         $localStorage.token=response.data.token;
                         $scope.ok();
                         $state.go('home');
                         window.location.reload();

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




//===========================================new test modal controller======================================================

     self.newTestCtrl = function($scope,$uibModalInstance, $state, $rootScope, testCRUD, $state) {      // modal controller

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
               testCRUD.setTest($scope.testData);
               $state.go('createTest');
               $uibModalInstance.close();
          }

          $scope.delete = () => {
               testCRUD.deleteTest($scope.testData._id);
               $state.transitionTo($state.current, $state.params, {
                    reload: true,
                    inherit: false,
                    notify: true
               });
               $uibModalInstance.close();
          }


          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }



//============================attempted test modal controller==============================================

     self.attemptedTestCtrl = function($scope,$uibModalInstance) {      // modal controller

          $scope.testData = self.attemptedTest;


          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }




//===========================login first warning controller=====================================

     self.loginFirstCtrl = function($scope,$uibModalInstance) {      // modal controller

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }




//===========================delete question warning controller=================================

     self.deleteQuestion = function($scope,$uibModalInstance, $rootScope) {      // modal controller

          $scope.delete = () => {
               $rootScope.$broadcast('deleteQuestion');
          }

          $scope.ok = () => {                                      // function to close the modal
               $rootScope.$broadcast('deleteQuestionRejected');
               $uibModalInstance.close();
          };
     }



//=================================test intruction for user modal controller=============================

     self.testInstructionsCtrl = function($scope,$uibModalInstance, $state) {      // modal controller

          $scope.terms = false;

          $scope.start = () => {
               if ($scope.terms === true) {
                    $state.go('exam');
                    $uibModalInstance.close();
               }
          }

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }



//===================================forgot password modal controller=============================
// this controller will use three diffrent modal templates for whole forgot password process

     self.forgotPasswordCtrl = function($scope,$uibModalInstance, forgotPassword) {      // modal controller

          $scope.cancelOkBtn = "Cancel";
          $scope.email = '';
          $scope.error = undefined;
          $scope.otp = '';
          var otpCounter = 0;
          var processCounter = 0;

          $scope.sentNotification = () => {
               forgotPassword.sentNotification($scope.email);
               self.userInfo = { 'email': $scope.email};
               otpCounter++;
          }

          $scope.sentOTP = () => {
               processCounter++;
               if (otpCounter >= 4) {
                    $scope.error = "You can only sent otp 3 times in one session."
               }else {
                    forgotPassword.sentNotification($scope.email);
                    otpCounter= otpCounter + 2;
               }
          }

          $scope.submitOTP = () => {
               forgotPassword.submitOTP($scope.otp);
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
                    forgotPassword.newPassword($scope.passwordF, self.userInfo.email);
               }

          }

          $rootScope.$on('successSentNotification', () => {

               $scope.error = undefined;
               if (otpCounter === 1) {
                    self.templateUrl = "../angular/views/modal/forgotPasswordModal2.html";
                    self.controller = self.forgotPasswordCtrl;
                    self.size = 'md';
                    self.modalFunction();
                    $uibModalInstance.close();
               }else {
                    $scope.error = "The otp has been sent 2nd time.";
               }
          });

          $rootScope.$on('unsuccessSentNotification', () => {
               $scope.eroor = "No such User is found with this email address";
          });

          $rootScope.$on('successOTPSubmittion', () => {
               if (processCounter != 0) {
                    $scope.error = undefined;
                    self.templateUrl = "../angular/views/modal/forgotPasswordModal3.html";
                    self.controller = self.forgotPasswordCtrl;
                    self.size = 'md';
                    self.modalFunction();
                    processCounter = 0;
                    $uibModalInstance.close();
               }
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



//===============================edit admin comments on the user profile modal controller================================

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




//==================================dummy modal controller============================================================

     self.dummyCtrl = function($scope,$uibModalInstance) {      // modal controller

          $scope.message = self.dummymsg;

          $rootScope.$on('close modal', () =>{
               $uibModalInstance.close();
          });

          $scope.ok = () => {                                      // function to close the modal
               $uibModalInstance.close();
          };
     }



//======================================result modal controller===========================================

     self.resultCtrl = function($scope,$uibModalInstance) {      // modal controller

          $scope.result = self.userResult;

          $scope.ok = () => {                                      // function to close the modal
               $state.go('home');
               $uibModalInstance.close();
          };
     }

}]);
