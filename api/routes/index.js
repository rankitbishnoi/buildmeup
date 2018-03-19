var express = require('express');
var passport = require('passport');
var router = express.Router();

var jwtAuthentication = require('../helpers/jwtAuthentication');
var userAuthParameterVerification = require('../helpers/userAuthParameterVerification');
var testParamsVerification = require('../helpers/testRequestParameterVerification');
var userParamsVerification = require('../helpers/userTestTakenRequestParameterVerification');
var ctrlAuth = require('../controllers/auth');
var ctrlTest = require('../controllers/test');
var ctrlUser = require('../controllers/user');

// authentication routers
router.post('/register', userAuthParameterVerification.register, ctrlAuth.register);
router.post('/login', userAuthParameterVerification.login, ctrlAuth.localLogin);

// send to facebook to do the authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));
// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback', ctrlAuth.facebookLogin);

// send to google to do the authentication
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
// the callback after google has authenticated the user
router.get('/auth/google/callback', ctrlAuth.googleLogin);



// test routers
router.post('/createEditTest', jwtAuthentication.auth, testParamsVerification.createTestParams, ctrlTest.createTest);

router.post('/deleteTest', jwtAuthentication.auth, testParamsVerification.deleteTestParams, ctrlTest.deleteTest);

router.get('/getTestList', ctrlTest.getTestList);

router.get('/getTotalNoOfTests', jwtAuthentication.auth, ctrlTest.getTotalNoOfTests);

router.get('/fetchSubjectList', ctrlTest.fetchSubjectList);

router.get('/fetchSubjectTests', jwtAuthentication.auth, ctrlTest.fetchSubjectTests);

router.post('/getAdminTestList', jwtAuthentication.auth, testParamsVerification.getAdminTestListParams, ctrlTest.getAdminTestList);


// user routers
router.get('/getUserTestDetails', jwtAuthentication.auth, ctrlUser.getUserTestDetails);

router.get('/getUserListForAdmin', jwtAuthentication.auth, ctrlUser.getUserListForAdmin);

router.get('/getTopStudents', ctrlUser.getTopStudents);

router.get('/getUserTestsData', jwtAuthentication.auth, ctrlUser.getUserTestsData);

router.get('/getAllUserData', jwtAuthentication.auth, ctrlUser.getAllUserData);

router.post('/saveAdminComments', jwtAuthentication.auth, ctrlUser.saveAdminComments);

router.post('/changePassword', jwtAuthentication.auth, userParamsVerification.changePasswordPamas, ctrlUser.changePassword);

router.post('/updateTestOnUser', jwtAuthentication.auth, userParamsVerification.updateTestOnUserParams, ctrlUser.updateTestOnUser);




module.exports = router;
