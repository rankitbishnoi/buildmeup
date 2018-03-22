myapp.controller('examCtrl', ['modalService','$state','tokenValidation','socket', 'userService', '$rootScope', function(modalService, $state, tokenValidation, socket, userService, $rootScope) {
     var self = this;
     self.markedOption = [];

//==================================token validation using service and changing the DOM accordingly ========================
     var tokenValidationResult = tokenValidation.validation();

     if (tokenValidationResult === false) {
          $state.go('home');
     }else {
          self.userInfo = tokenValidationResult;
          if (modalService.newTest === undefined) {
               $state.go('home')
          }else {
               self.test = modalService.newTest;
          }
     }
//=============================================================================================================================


     self.testTaken = {                 // setting the answer sheet for submition
                         testId : self.test._id,
                         name: self.test.name,
                         takenOn: Date.now(),
                         totalQuestions: self.test.questions.length,
                         answers: [],
     };

     self.test.questions.forEach((question, i) => {
          self.markedOption[i] = 0;
     });

     self.presentQuestionNumber = 1;

     self.markAnswer = (option) => {
          self.markedOption[self.presentQuestionNumber-1] = option;
          var obj = { id : self.test.questions[(self.presentQuestionNumber-1)]._id, markedOption : option};
          var counter = 0;
          var index = undefined;
          self.testTaken.answers.forEach((answer) => {
               if (answer.id === obj.id) {
                    index = counter;
               }
               counter++;
          });

          if (index === undefined) {
               self.testTaken.answers.push(obj);
          }else {
               self.testTaken.answers.splice(index, 1, obj);
          }
     }

     self.next = () => {
          self.presentQuestionNumber++;
     }

     self.previous = () => {
          self.presentQuestionNumber--;
     }

     self.changeQuestion = (index) => {
          self.presentQuestionNumber = (index + 1);
     }

     self.submit = () => {
          self.testTaken.correct = 0;
          self.testTaken.attemptedQuestions = self.testTaken.answers.length;
          if (self.minutes != 0) {
               self.stopTimer();
          }
          self.testTaken.timeTaken = (((self.test.timeLimit - self.minutes)*60) - self.seconds);
          self.testTaken.answers.forEach((answer)=> {
               self.test.questions.forEach((question) => {
                    if (question._id === answer.id && question.correct === answer.markedOption) {
                         self.testTaken.correct++;
                    }
               });
          });
          self.testTaken.score = ((self.testTaken.correct/self.testTaken.totalQuestions) * 100).toFixed(2);
          userService.updateTestOnUser(self.testTaken, self.userInfo._id);
          modalService.setParameters('dummyModal');                              // result submition modal
          modalService.setDummyMessage('Your test has been submitted. Please wait while we evaluate it. Do not click On the Screen.');
          modalService.modalFunction();
          self.scorCounter = 1;
     }

     $rootScope.$on('successUpdatingTestOnUser', () => {
          if (self.scorCounter === 1) {
               $rootScope.$broadcast('close modal');                       // close the submition modal
               modalService.setParameters('result');                          // result modal settings and calling it
               modalService.setResultOfUserTest(self.testTaken);
               modalService.modalFunction();
               self.scorCounter = 0 ;
          }
     });

     //========================socket ======================

     socket.emit('start exam time', self.test.timeLimit);

     socket.on('timer', (time) => {
          self.minutes = Math.floor(time / 60);
          self.seconds = time - self.minutes * 60;
     });

     socket.on('submit test', () => {
          self.submit();
     });

     self.stopTimer = () => {
          socket.emit('stop timer');
     }


}])
