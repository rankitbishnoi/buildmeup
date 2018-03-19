myapp.controller('homeCtrl', ['$rootScope','testService','modalService','userService', function($rootScope, testService, modalService, userService){
     var self = this;

     testService.fetchSubjectList();
     testService.fetchLatestTests();
     userService.fetchTopScorerList();

     $rootScope.$on('subjectList', () => {
          self.subjects = testService.subjectList;
     });

     $rootScope.$on('latestTests', () => {
          self.testList = testService.latestTests;
          self.availableTestNumberOfPages= Math.ceil(self.testList.length/self.pageSize);
     });

     $rootScope.$on('topScorerList', () => {
          self.topScorerList = userService.topScorerList;
     })

     self.availableTestCurrentPage = 0;
     self.pageSize = 10;

     self.openTest = (testData) => {
          if (modalService.userInfo === undefined) {
               modalService.setParameters('loginFirst');
               modalService.modalFunction();
          }else {
               modalService.setParameters('newTest');
               modalService.setParametersForNewtest(testData);
               modalService.modalFunction();
          }
     }
}])
