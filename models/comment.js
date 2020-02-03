var mongoose = require("mongoose");

// set up the comment schema
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        },
        username: String
    }
})

// compile the schema into a model and export it
module.exports = mongoose.model("Comment", commentSchema);