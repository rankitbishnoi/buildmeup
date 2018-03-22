myapp.controller('singleUserCtrl', ['$rootScope','userService','$state','tokenValidation','modalService', 'testService', function($http, userService, $state, tokenValidation, modalService, testService){
      var self = this;

//==================================token validation using service and changing the DOM accordingly ========================
      var tokenValidationResult = tokenValidation.validation();

     if (tokenValidationResult === false) {
          $state.go('home');
     }else {
          self.userInfo = tokenValidationResult;
          modalService.setUserInfo(self.userInfo);
          if (self.userInfo.batch != 'Admin') {
               $state.go('home');
          }
     }
//=============================================================================================================================

     userService.fetchAllUserData($state.params.id);
     testService.fetchTotalNoOfTests();

     $rootScope.$on('allUserData', () => {
          self.user = userService.allUserData;
          self.averageScoreData = [(100-self.user.avgScore), self.user.avgScore];              // details for the donut chart
     });

     $rootScope.$on('totalNoOfTests', () => {
          self.totalTests = testService.totalTests;
          self.totalAttemptedTestsData = [(self.totalTests - self.user.testTaken.length), self.user.testTaken.length];       // details for the donut chart
     });

     self.editAdminComments = () => {
          modalService.setParameters('adminComments');
          modalService.setAdminComments(self.user.adminComments);
          modalService.modalFunction();
     }

     self.testOverview = (testData) => {
          modalService.setParameters('attemptedTest');
          modalService.setParametersForAttemptedtest(testData);
          modalService.modalFunction();
     }

     $rootScope.$on('addAdminComments', (adminComments) => {
          userService.saveAdminComments(adminComments, self.user._id);
     });

     $rootScope.$on('successAddAdminComments', (adminComments) => {
          self.user.adminComments = adminComments;
     });

     self.averageScoreLabels = ['(%)', 'Average Score(%)'];                            // lables for the donut chart
     self.totalAttemptedTestsLabels = ['Total No. Of tests', 'Attempted']             // lables for the donut chart


}]);
