var jobApp = angular.module('jobApp',['ui.router','ngResource'])

  .config(function($stateProvider,$urlRouterProvider,$locationProvider){

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('indexState', {
      url: '/',
      templateUrl: '/views/templates/index.html',
      controller: 'IndexCtrl'
    });

    $stateProvider.state('loginState', {
      url: '/login',
      templateUrl: '/views/templates/login.html',
      controller: 'LoginCtrl'
    });

    $stateProvider.state('signupState', {
      url: '/signup',
      templateUrl: '/views/templates/signup.html',
      controller: 'SignupCtrl'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false // problematic
    });
  })

  .run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });
