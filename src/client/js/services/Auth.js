jobApp.factory('Auth', ['$location','$rootScope','$cookies','User','Session',
  function($location,$rootScope,$cookies,User,Session){
    $rootScope.currentUser = $cookies.get('session') || null;
    $cookies.remove('session');
    console.log('session:' + $rootScope.currentUser);

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
      },

      login: function(user, callback) {
        var cb = callback || angular.noop;
        Session.save({
          email: user.email,
          password: user.password,
        }, function(user) {
          $rootScope.currentUser = user;
          return cb();
        }, function(err) {
          return cb(err.data);
        });
      }
    };
  }
]);
