jobApp.controller('SignupCtrl',['$scope','$rootScope','$location','$resource','User','Auth',
  function($scope,$rootScope,$location,$resource,User,Auth){

    $scope.signup = function(){

      Auth.createUser({
        email: $scope.user.email,
        password: $scope.user.password
      },
      function(err){
          $scope.errors = {};

          if(!err){
            $location.path('/dashboard');
          }
      });
    };
  }
]);
