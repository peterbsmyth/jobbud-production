// ---- require dependencies
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// ---- define the schema for our user model
var userSchema = mongoose.Schema({
    local            : {
        email     : String,
        password     : String,
        isAdmin      : Boolean,
    },
    github           : {

    }
});

// ---- virtuals
userSchema.virtual('userInfo')
  .get(function (){
    return {'_id': this._id, 'email': this.local.email};
  });


// ---- methods ----
// ---- generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// ---- checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// ---- create the model for users and expose it
module.exports = mongoose.model('User', userSchema);
