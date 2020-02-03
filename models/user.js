var mongoose = require("mongoose");
var passportLocalMongoose =  require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    user: String,
    password: String
})

// add passportLocalMongoose functions to userSchema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);