jobApp.factory('Auth', ['$location','$rootScope','$cookies','User',
  function($location,$rootScope,$cookies,User){
    $rootScope.currentUser = $cookies.get('user') || null;
    $cookies.remove('user');

    return {

      createUser: function(userinfo, callback) {
        var cb = callback || angular.noop;
        User.save(userinfo,
          function(user) {
            $rootScope.currentUser = user;
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      }
    };
  }
]);
