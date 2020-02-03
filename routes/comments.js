var express = require("express");
var router = express.Router({mergeParams: true}); // this will ensure id value is resolved properly
var middleware = require("../middleware"); // will automatically acquire the index.js

var Campground = require("../models/campground")
var Comment = require("../models/comment");

// add new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find the campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// post new comment
router.post("/", middleware.isLoggedIn, function(req, res){
    //find the campground
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            //insert the comment
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                    req.flash("error", "Something went wrong. Comment could not be added.");
                    res.redirect("back");
                } else {
                    // add id and username to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment successfully added.");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
});

// edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            req.flash("error", "Something went wrong. Comment could not be found.");
            res.redirect("back");
        } else {
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
        }
    });
});

// update comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   // find the comment by id and update it
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err) {
           console.log(err);
           req.flash("error", "Something went wrong. Comment could not be updated.");
           res.redirect("back");
       } else {
           req.flash("success", "Comment successfully updated.");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

// delete comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            console.log(err);
            req.flash("error", "Something went wrong. Comment could not be deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            req.flash("success", "Comment successfully deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;