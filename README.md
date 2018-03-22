# [BuilMeUp](https://github.com/rankitbishnoi/buildmeup):
It is an web app for training/teaching institutions to provide tests to students and students will take test on this app.

## This web-app is based on MEANjs Platform and MVC architecture with SocketIo for realtime test enviornment:
* The back-end is based on Nodejs, Express, mongoose, SocketIo.
* The front-end is based on angularjs and bootstrap is used as css framework.
* Mongodb is used for database in this app.
* The authentication is done using the JWT, for which I have used [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to generate the JWT and [express-jwt](https://www.npmjs.com/package/express-jwt) to verify.

**To start the app:**

     Install the nodejs, Npm and Mongodb.

1. Open the terminal.
2. Start the mongodb.
3. Type:
```
          npm install
          node start server.js
```

**This web app is made with back-end and front-end combined together.**
1. When you run the app. It will listen the request on port 3000.
2. Visit http://ec2-18-191-2-34.us-east-2.compute.amazonaws.com to start the app on front-end.
3. if you place the whole app on any server and use the software like nginx or any else. Please change the $http request links accordingly.


## Basic Feature:

1. User can view all the test with filter as the subject of the test, or the latest uplaoded test.
2. The tests are shown in page of 10 at a time, user can press next or previous to navigate.
3. User can click the test to see the description of the test and press start to start the test.
4. User can view the details of the test he/she attempted before like time taken, score, attempted answers etc.
5. Admin dashboard shows him the tests he created in past and the user list with distinction of currently online/offline status.
6. Admin can click on the user to see all the details about him/her like previosly attempted tests and there performance charts.
7. While registering there is a batch input column which should only be used by the admin.
```
   * In that column admin will put the code provided by the institution to register.
   * That code differentiate the user and the admin.
   * Currently the code is '1234', but you can change it in the (./api/controller/auth.js)
```
8. Admin can click on the create test button to create new tests.
9. While changing password, for sending the otp to user via mail [NODEMAILER](https://www.npmjs.com/package/nodemailer) is used.
10. For login and register Ui-bootstrap modal are used at the front-end and passport configuration file is used at the back-end.
11. For encrypting the password crypto(which is nodejs native function) is used.
12. For authentication on every request JWT is used which will be provided to client-side on time of registering or login. There is also a expiry time for those tokens which you can change.


* Modals are used in various places like to show deletion warning, result, submition success etc.

## Developer :
Name: **Rankit Bishnoi**   
E-mail: rankitgodara1@gmail.com   
Mobile Number: +919416061874   
