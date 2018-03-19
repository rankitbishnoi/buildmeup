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

     .state('dashboard', {
          url: '/dashboard',
          templateUrl: './angular/views/dashboard.html',
          controller: 'dashboardCtrl',
          controllerAs: 'dashboard'
     })

     .state('exam', {
          url: '/exam',
          templateUrl: './angular/views/exam.html',
          controller: 'examCtrl',
          controllerAs: 'exam'
     })

     .state('createTest', {
          url: '/createTest',
          templateUrl: './angular/views/createTest.html',
          controller: 'createTestCtrl',
          controllerAs: 'createTest'
     })

     .state('performance', {
          url: '/performance',
          templateUrl: './angular/views/performance.html',
          controller: 'performanceCtrl',
          controllerAs: 'performance'
     })

     .state('singleUser', {
          url: '/singleUser',
          templateUrl: './angular/views/singleUser.html',
          controller: 'singleUserCtrl',
          controllerAs: 'singleUser'
     })
}]);
