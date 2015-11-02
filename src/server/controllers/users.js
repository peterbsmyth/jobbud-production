// ---- require dependencies
var User = require('../models/user');

// ---- create new user
// todo:
// -check that user doesn't exist
// -error handling
module.exports.create = function (req, res) {
  var newUser = new User();
  newUser.local.email = req.body.email;
  newUser.local.password = newUser.generateHash(req.body.password);
  newUser.save(function(err){
    if (err) {
      throw err;
    }
    return res.json(newUser.userInfo);
  });
};
