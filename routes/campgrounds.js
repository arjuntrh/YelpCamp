var express = require("express");
var router = express.Router();
var middleware = require("../middleware"); // will automatically acquire the index.js

var Campground = require("../models/campground");


// show all campgrounds
router.get("/", function(req, res){
    //get all the campgrounds from db
    Campground.find({}, function(error, allCampgrounds){
        if(error){
            console.log(error);
        } else{
            res.render("campgrounds/index", {myCampgrounds: allCampgrounds, page: 'campgrounds'});
        }
    });
});

// show add new campground page
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// shows more info about selected campground
router.get("/:id", function(req, res){
    //find the campground from the database and render it in the show template
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground){
        if(error){
            console.log(error);
            req.flash("error", "Something went wrong. Campground could not be found");
            res.redirect("back");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// post new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    var campName = req.body.campName;
    var imgURL = req.body.imgURL;
    var campDescription = req.body.description;
    var cost = req.body.cost;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    var newCampgroundObj = {name: campName, image: imgURL, description: campDescription, author: author, cost: cost}; 
    
    // add the new campground to database
    Campground.create(newCampgroundObj, function(error, newCampground){
        if(error){
            console.log(error);
            req.flash("error", "Something went wrong. Campground could not be created.");
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "Campground successfully created.");
            res.redirect("/campgrounds");
        }
    });
});

// show edit campground page
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            req.flash("error", "Something went wrong. Campground could not be found.");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
    
});

// update campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   // find the campground by id and update it
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err) {
           req.flash("error", "Something went wrong. Campground could not be updated.");
           res.redirect("/campgrounds/" + req.params.id);
       } else {
           req.flash("success", "Campground succesfully updated.");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

// delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            req.flash("error", "Something went wrong. Campground could not be deleted.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground successfully deleted.");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;