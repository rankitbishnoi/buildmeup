myapp.controller('createTestCtrl', ['testCRUD', '$rootScope','modalService','tokenValidation', function(testCRUD, $rootScope, modalService, tokenValidation) {
     var self  = this;
     self.deleteCounter = 0;
     self.saveCounter = 0;

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


     self.test = testCRUD.test;

     if (self.test === undefined) {
          self.test = {
               name: '',
               description: '',
               timeLimit: 0,
               subject: '',
               questions: [],
               admin: {
                         id: self.userInfo._id,
                         name: self.userInfo.name
               }
          }
     }

     self.delete = () => {
          testCRUD.deleteTest(self.test._id);
     }

     self.save = () => {
          testCRUD.saveTest(self.test);
     }

     self.editQuestion = (index) => {
          self.saveCounter = 1;
          self.editModetest = self.test.questions(index);
          self.editQuestionNumber = (index + 1);
          self.test.questions.splice(index, 1);
     }

     self.deleteQuestion = (index) => {
          self.deleteCounter = 1;
          modalService.setParameters('deleteQuestion');
          modalService.modalFunction();
          self.deleteQuestionIndex = index;
     }

     $rootScope.$on('deleteQuestion', () => {
          if (self.deleteCounter === 1) {
               self.test.questions.splice(self.deleteQuestionIndex, 1);
               self.deleteCounter = 0;
          }
     });

     $rootScope.$on('deleteQuestionRejected', () => {
          self.deleteCounter = 0;
     });

     self.addQuestion = () => {
          var editQuestionIndex = (self.editQuestionNumber - 1);
          self.test.questions.splice(editQuestionIndex, 0, self.editModetest);
     }

     self.questionsCurrentPage = 0;
     self.pageSize = 3;
     self.questionsNumberOfPages = Math.ceil(self.test.questions.length/self.pageSize);

     $rootScope.$on('successSaveTest', () => {
          self.saveCounter = 0;
          modalService.setParameters('dummyModal');
          modalService.setDummyMessage('Your Test has been saved');
          modalService.modalFunction();
     });

     $rootScope.$on('successDeleteTest', () => {
          $state.go('dashboard');
          modalService.setParameters('dummyModal');
          modalService.setDummyMessage('The test has been deleted.');
          modalService.modalFunction();

     });

     $rootScope.$on('unsuccessSaveTest', (msg) => {
          modalService.setParameters('dummyModal');
          modalService.setDummyMessage(msg);
          modalService.modalFunction();
     });


}])
