var User = require('../models/user');

module.exports.create = function (req, res) {
  var newUser = new User();
  console.log(newUser);
  newUser.local.email = req.body.email;
  newUser.local.password = newUser.generateHash(req.body.password);
  console.log(newUser);
  newUser.save(function(err){
    if (err) {
      throw err;
    }
    return res.json(newUser.userInfo);
  });
};
