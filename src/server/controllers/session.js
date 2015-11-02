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
      req.session.destroy();
      res.json({error: 'no user found!'});
    } else {
      //if password matches
      if (user.validPassword(req.body.password)) {
        // respond with user info
        req.session.user = user.userInfo;
        res.json(user.userInfo);
      } else {
        // respond with error
        console.log('wrong password');
        res.redirect('/');
      }
    }
  });
};

module.exports.logout = function(req, res) {
  console.log(req.session);
  if (req.session.user){
    req.session.destroy();
    res.sendStatus(200);
  } else{
    res.sendStatus(400,'not logged in');
  }
};
