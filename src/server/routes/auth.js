module.exports = function(app, passport) {

  // ---- process the login form
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/dashboard',
      failureRedirect : '/fail'
  }));

  // ---- process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/dashboard',
      failureRedirect : '/'
  }));

  // ---- logout
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });
};
