myapp.controller('dashboardCtrl', ['$rootScope', 'testService', 'tokenValidation','$state','modalService','userService', 'testCRUD', 'socket', function($rootScope, testService, tokenValidation, $state, modalService, userService, testCRUD, socket) {
     var self = this;

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

     testService.fetchAdminTest(self.userInfo._id);
     userService.fetchAllUserListForAdmin();

     $rootScope.$on('adminTest', () => {
          self.testList = testService.adminTest;
          self.testNumberOfPages= Math.ceil(self.testList.length/self.pageSize);
     })

     $rootScope.$on('userListForAdmin', () => {
          self.userList = userService.userList;
          self.userListNumberOfPages = Math.ceil(self.userList.length/self.pageSize);
     })

     self.testCurrentPage = 0;
     self.userListCurrentPage = 0;
     self.pageSize = 10;

     self.openTest = (testData) => {
          modalService.setParameters('newTest');
          modalService.setParametersForNewtest(testData);
          modalService.modalFunction();
     }

     self.goToCreateTest = () => {
          testCRUD.setTest(undefined);
          $state.go('createTest')
     }

     //==============socket====================

     socket.on('new user online', (users) => {
          users.forEach((user) => {

               self.userList.forEach((userL, i) => {
                    if (userL.email === user.email) {
                         self.userList[i].status = 'online';
                    }
               })
          });
     });
}]);
