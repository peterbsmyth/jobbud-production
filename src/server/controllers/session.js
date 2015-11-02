var User   = require('../models/user');
var bcrypt = require('bcrypt');

module.exports.login = function(req, res) {
  console.log("login triggered");
  console.log(req.cookies);
  User.findOne({ "local.email": req.body.email }, function(err, user) {
    if (!user) {
      res.json({error: 'no user found!'});
    } else {
      if (user.validPassword(req.body.password)) {
        // utils.createUserSession(req, res, user);
        res.json(user.userInfo);
      } else {
        console.log('wrong password');
        res.redirect('/');
      }
    }
  });
};
