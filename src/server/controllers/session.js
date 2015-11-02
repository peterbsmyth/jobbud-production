var User   = require('../models/user');

// ---- login user
// todo:
// -respond with a cookie
// -error handling
module.exports.login = function(req, res) {
  console.log("login triggered");
  console.log(req.cookies);
  //check database for user
  User.findOne({ "local.email": req.body.email }, function(err, user) {
    // if there's no user
    if (!user) {
      // respond with error
      res.json({error: 'no user found!'});
    } else {
      //if password matches
      if (user.validPassword(req.body.password)) {
        // respond with user info
        res.json(user.userInfo);
      } else {
        // respond with error
        console.log('wrong password');
        res.redirect('/');
      }
    }
  });
};
