var jobApp = angular.module('jobApp',['ui.router','ngResource','ngCookies'])

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

    $stateProvider.state('dashboardState', {
      url: '/dashboard',
      templateUrl: '/views/templates/dashboard.html',
      controller: 'DashboardCtrl'
    });

    $stateProvider.state('adminState', {
      url: '/admin',
      templateUrl: '/views/templates/admin.html',
      controller: 'AdminCtrl'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false // problematic
    });
  });
