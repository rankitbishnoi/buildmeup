myapp.controller('testCtrl', ['$stateParams','testService','$rootScope','tokenValidation','$state','modalService', function($stateParams, testService, $rootScope, tokenValidation, $state, modalService) {
     var self = this;

     var tokenValidationResult = tokenValidation.validation();

     if (tokenValidationResult === false) {
          $state.go('home');
     }else {
          self.userInfo = tokenValidationResult;
          modalService.setUserInfo(self.userInfo);
     }

     if ($state.params.type === 'subj') {
          testService.fetchSubjectTests($state.params.name);
          self.subjectname = $state.params.name;
     }else if ($state.params.type === 'name') {
          testService.fetchLatestTests();
     }

     testService.fetchSubjectList();
     testService.fetchAttemptedTests(self.userInfo._id);

     self.getSubjectList = (subjectname) => {
          testService.fetchSubjectTests(subjectname);
     }

     $rootScope.$on('subjectList', () => {
          self.subjectList = testService.subjectList;
     });

     $rootScope.$on('subjectTests', () => {
          self.testList = testService.subjectTestList;
          self.availableTestNumberOfPages= Math.ceil(self.testList.length/self.pageSize);
     });

     $rootScope.$on('latestTests', () => {
          self.testList = testService.latestTests;
          self.availableTestNumberOfPages= Math.ceil(self.testList.length/self.pageSize);
     });

     $rootScope.$on('attemptedTests', () => {
          self.attemptedTests = testService.attemptedTests;
          self.attemptedTestsNumberOfPages = Math.ceil(self.attemptedTests.length/self.pageSize);
     })

     self.availableTestCurrentPage = 0;
     self.attemptedTestsCurrentPage = 0;
     self.filterCurrentPage = 0;
     self.pageSize = 10;


     self.openTest = (testData) => {
          modalService.setParameters('newTest');
          modalService.setParametersForNewtest(testData);
          modalService.modalFunction();
     }

     self.openAttemptedTest = (testData) => {
          modalService.setParameters('attemptedTest');
          modalService.setParametersForAttemptedtest(testData);
          modalService.modalFunction();
     }

}]);
