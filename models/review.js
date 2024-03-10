const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment : String,
    ratting:{
            type: Number,
            min:1,
            max:5,
        },
    createAT:{
        type:Date,
        default: Date.now(),
    }

})
module.exports =  mongoose.model("Review", reviewSchema);