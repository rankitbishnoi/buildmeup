myapp.controller('examCtrl', ['modalService','$state','tokenValidation', function(modalService, $state, tokenValidation) {
     var self = this;

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

     self.testTaken = {
                         testId : self.test._id,
                         name: self.test.name,
                         on: Date.now(),
                         answers: [],
     };

     self.presentQuestionNumber = 1;

     self.markAnswer = (option) => {
          self.markedOption = String(option);
          var obj = { qId : self.test.questions[(self.presentQuestionNumber-1)].qId, markedOption : option};
          var counter = 0;
          var index = undefined;
          self.testTaken.answers.forEach((answer) => {
               if (answer.qId === obj.qId) {
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

     }

}])
