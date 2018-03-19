myapp.service('tokenValidation', ['$localStorage', function($localStorage){
     var self = this;

     self.parseJwt = (token) => {            // function to decode the token in local storage
          try {
               return JSON.parse(atob(token.split('.')[1]));
          } catch (e) {
               return null;
          }
     };

     self.validation = () => {
          if($localStorage.token != undefined) {         // function to decide that the user is provided with login functionallity if he/she is not logged in yet on the basis of the token stored in localStorage
                                                           // or he/she should be provide with logout functionality, if he/she is already logged in
               self.info = self.parseJwt($localStorage.token);
               var dateNow = new Date();
               self.info.exp = (self.info.exp*1000);
               if(self.info.exp < dateNow.getTime()){
                    return false;
               }else {
                    return self.info;
               }
          }else {
               return false;
          }
     }
}])
