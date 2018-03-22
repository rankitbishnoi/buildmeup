myapp.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.otherwise('/home');

     $stateProvider

     // HOME STATES
     .state('home', {
          url: '/home',
          templateUrl: './angular/views/home.html'
     })
     //QUERY STATE
     .state('test', {
          url: '/test',
          params: {
               type: null,
               name: null
          },
          templateUrl: './angular/views/test.html',
          controller: 'testCtrl',
          controllerAs: 'test'
     })
     //dashboard STATE
     .state('dashboard', {
          url: '/dashboard',
          templateUrl: './angular/views/dashboard.html',
          controller: 'dashboardCtrl',
          controllerAs: 'dashboard'
     })
     //EXAM STATE
     .state('exam', {
          url: '/exam',
          templateUrl: './angular/views/exam.html',
          controller: 'examCtrl',
          controllerAs: 'exam'
     })
     // CREATE TEST STATE
     .state('createTest', {
          url: '/createTest',
          templateUrl: './angular/views/createTest.html',
          controller: 'createTestCtrl',
          controllerAs: 'createTest'
     })
     // PERFORMANCE STATE
     .state('performance', {
          url: '/performance',
          templateUrl: './angular/views/performance.html',
          controller: 'performanceCtrl',
          controllerAs: 'performance'
     })
     // SINGLE USER DETAILS STATE
     .state('singleUser', {
          url: '/singleUser',
          templateUrl: './angular/views/singleUser.html',
          controller: 'singleUserCtrl',
          controllerAs: 'singleUser'
     })
}]);
