myapp.service('testCRUD', ['$http', '$rootScope','$localStorage', function($http, $rootScope, $localStorage) {
     var self = this;
     var token = $localStorage.token;

     self.setTest = (test) => {
          self.test = test;
     }

     $rootScope.$on('editNewTest', (test) => {
          self.test = test;
     })

     self.saveTest = (test) => {
          var data = test;
          $http.post('http://localhost:3000/api/createEditTest', data, { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    $rootScope.$broadcast('successSaveTest');
               }
          }), function errorCallback(response){
               if (response.status === 400) {
                    $rootScope.$broadcast('unsuccessSaveTest', response.data);
               }else if (response.status === 401) {
                    $rootScope.$broadcast('unsuccessSaveTest', response.data);
               }
          };
     }

     self.saveTest = (testId) => {
          var data = {id : testId};
          $http.post('http://localhost:3000/api/deleteTest', data, { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    $rootScope.$broadcast('successDeleteTest');
               }
          }), function errorCallback(response){
               if (response.status === 400) {
                    $rootScope.$broadcast('unsuccessSaveTest', response.data);
               }else if (response.status === 401) {
                    $rootScope.$broadcast('unsuccessSaveTest', response.data);
               }
          };
     }

}])
