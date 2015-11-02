var User = require('../models/user');
var ctrl = require('../controllers/index');

module.exports = function(app) {

  // ---- process the signup form
  app.post('/auth/users', ctrl.users.create);
  app.post('/auth/session', ctrl.session.login);

};
