var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");



var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true

  },
  password: {
    type: String
  },
  mail: {
    type: String
  },
  name: {
    type: String
  }
});

var User = module.exports = mongoose.model("User",UserSchema);

module.exports.createUser = function(newUser, callback){

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
        // Store hash in your password DB.
      });
  });
}

module.exports.getUserByUsername = function(username,callback){
  var query = {username: username};
  User.findOne(query,callback);
}

module.exports.getUserById = function(id,callback){
  User.findOne(id,callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
  bcrypt.compareSync(candidatePassword, hash, function(err,isMatch){
    if (err) throw err;
    callback(null, isMatch);
  }); // true
}
