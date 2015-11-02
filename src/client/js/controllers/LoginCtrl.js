jobApp.controller('LoginCtrl',['$scope','$location','Auth',
  function($scope,$location,Auth){
    $scope.error = {};
    $scope.user = {};

    $scope.login = function() {
      Auth.login({
          'email': $scope.user.email,
          'password': $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/admin');
          } 
      });
    };
  }
]);
