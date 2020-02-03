var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

// create some starter data
var data = [
    {
         name: "Kodachadri",
         image: "https://www.weekendthrill.com/wp-content/uploads/2016/08/Camping_5.jpg",
         description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam sed tellus id magna elementum tincidunt. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Aliquam ante. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Praesent in mauris eu tortor porttitor accumsan."
    },
    {
        name: "Kumara Parvatha",
        image: "https://cdn.explara.com/8kypvls28i7hyd5c3bfun8278ogxfpuixmmwyzcog2xaq0xcyvbpy143vtki2vpu31aaw1912-h256020151208210108.jpeg",
        desciption: "Mauris metus. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos."
    }]

function seedDB() {
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed all campgrounds!")
        }
        
        // add some campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //       if(err) {
        //         console.log(err);
        //         } else {
        //             console.log("Added new campground!")
        //             // add a comment
        //             Comment.create(
        //                 {
        //                     text: "This is a test comment",
        //                     author: "Arjun"
        //                 }, function(err, comment) {
        //                         if(err) {
        //                             console.log(err);
        //                         } else {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Added new comment");
        //                         }
        //                 });
        //         } 
        //     });
        // });
    });
    
}

module.exports = seedDB;