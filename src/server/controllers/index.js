// ---- require dependencies
var users   = require('./users');
var session = require('./session');

// ---- namespace controllers for easy access
module.exports = {
  users: users,
  session: session,
};
