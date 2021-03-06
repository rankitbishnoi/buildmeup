myapp.service('userService', ['$http', '$rootScope','$localStorage', function($http, $rootScope, $localStorage) {
     var self = this;
     var token = $localStorage.token;

     self.fetchUserTestData = (userId) => {
          $http.get('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/getUserTestsData?id='+userId, { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    self.userTestData = response.data;
                    $rootScope.$broadcast('userTestData');
               }
          }), function errorCallback(response){
               if (response.status === 400 || response.status === 401) {
                    console.log(response.data);
               }
          };
     }

     self.fetchAllUserData = (userid) => {
          $http.get('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/getAllUserData?id='+userId, { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    self.allUserData = response.data;
                    $rootScope.$broadcast('allUserData');
               }
          }), function errorCallback(response){
               if (response.status === 400 || response.status === 401) {
                    console.log(response.data);
               }
          };
     }

     self.saveAdminComments = (adminComments, userId) => {
          var data = { 'adminComments': adminComments, 'id': userId};
          $http.post('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/saveAdminComments', data, { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    $rootScope.$broadcast('successAddAdminComments');
               }
          }), function errorCallback(response){
               if (response.status === 400 || response.status === 401) {
                    console.log(response.data);
               }
          };
     }

     self.fetchTopScorerList = () => {
          $http.get('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/getTopStudents').then( function successCallback(response){
               if (response.status === 200) {
                    self.topScorerList = response.data;
                    $rootScope.$broadcast('topScorerList');
               }
          }), function errorCallback(response){
               if (response.status === 400 || response.status === 401) {
                    console.log(response.data);
               }
          };
     }

     self.fetchAllUserListForAdmin = () => {
          $http.get('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/getUserListForAdmin', { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    self.userList = response.data;
                    $rootScope.$broadcast('userListForAdmin');
               }
          }), function errorCallback(response){
               if (response.status === 400 || response.status === 401) {
                    console.log(response.data);
               }
          };
     }

     self.updateTestOnUser = (test, userId) => {
          var data = { testTaken: test, id: userId};
          $http.post('http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com/api/updateTestOnUser', data, { headers: {'Authorization': 'Bearer '+ token}}).then( function successCallback(response){
               if (response.status === 200) {
                    $rootScope.$broadcast('successUpdatingTestOnUser');
               }
          }), function errorCallback(response){
               if (response.status === 400 || response.status === 401) {
                    console.log(response.data);
               }
          };
     }
}]);
