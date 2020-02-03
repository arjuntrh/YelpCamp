var express = require("express");
var router = express.Router();

var passport = require("passport");
var User = require("../models/user");

// Index Route
router.get("/", function(req, res){
    res.render("landing");
});

// show sign-up page
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
})

// register new user
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
                res.redirect("/campgrounds");
            })
        }
    });
})

// show login page
router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});

// authenticate and login the user
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true
        }), function(req, res){
});

// logout the user
router.get("/logout", function(req, res) {
    req.logout(); // removes all user data from the session
    req.flash("success", "Logged you out successfully.");
    res.redirect("/campgrounds");
});

module.exports = router;