myapp.controller('performanceCtrl', ['userService','$rootScope','tokenValidation', '$state', 'testService', function(userService, $rootScope, tokenValidation, $state, testService) {
     var self= this;

//==================================token validation using service and changing the DOM accordingly ========================
     var tokenValidationResult = tokenValidation.validation();

     if (tokenValidationResult === false) {
          $state.go('home');
     }else {
          self.userInfo = tokenValidationResult;
     }

//=============================================================================================================================


     userService.fetchUserTestData(self.userInfo._id);
     testService.fetchTotalNoOfTests();

     $rootScope.$on('userTestData', () => {
          self.userTestData = userService.userTestData;
          self.totalTests = testService.totalTests;
          self.averageScoreData = [(100-self.userTestData.avgScore), self.userTestData.avgScore];       // details for the donut chart
          self.totalAttemptedTestsData = [(self.totalTests - self.userTestData.noOfTestTaken), self.userTestData.noOfTestTaken];           // details for the donut chart
     });

     $rootScope.$on('totalNoOfTests', () => {
          self.totalTests = testService.totalTests;
          self.totalAttemptedTestsData = [(self.totalTests - self.userTestData.noOfTestTaken), self.userTestData.noOfTestTaken];         // details for the donut chart
     });

     self.averageScoreLabels = ['(%)', 'Average Score(%)'];                       // lables for donut chart
     self.totalAttemptedTestsLabels = ['Total No. Of tests', 'Attempted']           // lables for the donut chart
}]);
