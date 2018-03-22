myapp.service('testService', ['$http','$rootScope','$localStorage', function($http, $rootScope, $localStorage) {
     var self = this;
     var token = $localStorage.token;

     self.fetchSubjectTests = (subject) => {
          $http.get('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/fetchSubjectTests?name='+subject, { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    self.subjectTestList = response.data;
                    $rootScope.$broadcast('subjectTests');
               }
          }), function errorCallback(response){
               if (response.status === 400) {
                    console.log(response.data);
               }
          };
     }

     self.fetchAttemptedTests = (userId) => {
          $http.get('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/getUserTestDetails?id='+userId, { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    self.attemptedTests = response.data;
                    $rootScope.$broadcast('attemptedTests');
               }
          }), function errorCallback(response){
               if (response.status === 400) {
                    console.log(response.data);
               }
          };
     }

     self.fetchSubjectList = () => {
          $http.get('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/fetchSubjectList').then( function successCallback(response){
               if (response.status === 200) {
                    self.subjectList = response.data;
                    $rootScope.$broadcast('subjectList');
               }
          }), function errorCallback(response){
               if (response.status === 400) {
                    console.log(response.data);
               }
          };
     }

     self.fetchLatestTests = () => {
          $http.get('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/getTestList').then( function successCallback(response){
               if (response.status === 200) {
                    self.latestTests = response.data;
                    $rootScope.$broadcast('latestTests');
               }
          }), function errorCallback(response){
               if (response.status === 400) {
                    console.log(response.data);
               }
          };
     }

     self.fetchAdminTest = (adminId) => {
          var data = {id : adminId};
          $http.post('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/getAdminTestList', data, { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    self.adminTest = response.data;
                    $rootScope.$broadcast('adminTest');
               }
          }), function errorCallback(response){
               if (response.status === 400 || response.status === 401) {
                    console.log(response.data);
               }
          };
     }

     self.fetchTotalNoOfTests = () => {
          $http.get('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/getTotalNoOfTests', { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    self.totalTests = response.data;
                    $rootScope.$broadcast('totalNoOfTests');
               }
          }), function errorCallback(response){
               if (response.status === 400) {
                    console.log(response.data);
               }
          };
     }
}]);
