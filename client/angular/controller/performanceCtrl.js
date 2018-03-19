myapp.controller('performanceCtrl', ['userService','$rootScope','tokenValidation', '$state', 'testService', function(userService, $rootScope, tokenValidation, $state, testService) {
     var self= this;

     var tokenValidationResult = tokenValidation.validation();

     if (tokenValidationResult === false) {
          $state.go('home');
     }else {
          self.userInfo = tokenValidationResult;
     }

     userService.fetchUserTestData(self.userInfo._id);
     testService.fetchTotalNoOfTests();

     $rootScope.$on('userTestData', () => {
          self.userTestData = userService.userTestData;
          self.totalTests = testService.totalTests;
          self.averageScoreData = [(100-self.userTestData.avgScore), self.userTestData.avgScore];
          self.totalAttemptedTestsData = [(self.totalTests - self.userTestData.noOfTestTaken), self.userTestData.noOfTestTaken];
     });

     $rootScope.$on('totalNoOfTests', () => {
          self.totalTests = testService.totalTests;
          self.totalAttemptedTestsData = [(self.totalTests - self.userTestData.noOfTestTaken), self.userTestData.noOfTestTaken];
     });

     self.averageScoreLabels = ['(%)', 'Average Score(%)'];
     self.totalAttemptedTestsLabels = ['Total No. Of tests', 'Attempted']
}]);
