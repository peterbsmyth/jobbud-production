var jobApp = angular.module('jobApp',['ui.router']);

jobApp.config(function($stateProvider,$urlRouterProvider,$locationProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider.state('indexState', {
    url: '/',
    templateUrl: '/views/templates/index.html',
    controller: 'IndexCtrl'
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false // problematic
  });
});
