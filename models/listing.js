const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type:String,
        required:true, 
    }, 
    descriptionescription:{
        type: String,
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzb3J0fGVufDB8fDB8fHww",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzb3J0fGVufDB8fDB8fHww" : v,
    },
    price:{
        type:Number,
    },
    location:{
        type: String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
        
    ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await review.deleteMany({_id: {in: listing.reviews}});
    }
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;

