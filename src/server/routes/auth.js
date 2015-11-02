// ---- require dependencies
var User = require('../models/user');
var ctrl = require('../controllers/index');

// ---- auth routes
module.exports = function(app) {

  // process the signup form
  app.post('/auth/users', ctrl.users.create);

  // process the login form
  app.post('/auth/session', ctrl.session.login);
  app.delete('/auth/session', ctrl.session.logout);

};
