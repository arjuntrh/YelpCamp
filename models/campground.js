var mongoose = require("mongoose");

// Set-up the campground schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    cost: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment"
        }
    ]
});

// compile the schema into a model and export it 
module.exports = mongoose.model("Campground", campgroundSchema);
