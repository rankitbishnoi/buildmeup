myapp.controller('createTestCtrl', ['testCRUD', '$rootScope','modalService','tokenValidation','$state', function(testCRUD, $rootScope, modalService, tokenValidation, $state) {
     var self  = this;
     self.deleteCounter = 0; //counter to execute the process only once even if the event is emitted twice
     self.saveCounter = 0; //counter to execute the process only once even if the event is emitted twice


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

     self.test = testCRUD.test; // getting the test details if admin came to this ui-state for editing test

     if (self.test === undefined) { // getting the test details ready in variable if admin came to this ui-state for creating test
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
          self.deleteCounter = 1;
          testCRUD.deleteTest(self.test._id);
     }

     self.save = () => {
          testCRUD.saveTest(self.test);
     }

     self.editQuestion = (index) => {
          self.saveCounter = 1;
          self.editModetest = self.test.questions[index];
          self.editQuestionNumber = (index + 1);
          self.test.questions.splice(index, 1);
     }

     self.deleteQuestion = (index) => {
          self.deleteCounter = 1;
          modalService.setParameters('deleteQuestion');  // setting modal instructions in modal service
          modalService.modalFunction();                       // calling modal from modalService
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
          self.editModetest = {};
     }

     self.questionsCurrentPage = 0;
     self.pageSize = 3;
     self.questionsNumberOfPages = Math.ceil(self.test.questions.length/self.pageSize);

     $rootScope.$on('successSaveTest', () => {
          if (self.saveCounter === 1) {
               modalService.setParameters('dummyModal');            // setting modal instructions in modal service
               modalService.setDummyMessage('Your Test has been saved');      // setting the template for dummy modal
               modalService.modalFunction();                          // calling modal from modalService
          }
          self.saveCounter = 0;
     });

     $rootScope.$on('successDeleteTest', () => {
          if (self.deleteCounter === 1) {
               $state.go('dashboard');
               modalService.setParameters('dummyModal');                        // setting modal instructions in modal service
               modalService.setDummyMessage('The test has been deleted.');       // setting the template for dummy modal
               modalService.modalFunction();
          }
          self.deleteCounter = 0;
     });

     $rootScope.$on('unsuccessSaveTest', (msg) => {
          modalService.setParameters('dummyModal');                             // setting modal instructions in modal service
          modalService.setDummyMessage(msg);                                     // setting the template for dummy modal
          modalService.modalFunction();                                          // calling modal from modalService
     });


}])
