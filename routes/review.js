const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js")
const { reviewSchema} = require("../schema.js");
const review = require("../models/review.js");
const listing = require ("../models/listing.js");

const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
          throw new expressError(400, error);
    }else{
        next();
    }
};

//reviews
router.post("/", validateReview, wrapAsync(async (req, res) => {
    let lis = await listing.findById(req.params.id);
    let newReview = new review(req.body.review);

    lis.reviews.push(newReview);
    
    await newReview.save();
    await lis.save();

    res.redirect(`/listing/${lis._id}`);
}));

//delete reviews 
router.delete("/:reviewId", wrapAsync(async(req, res) => {
    let {id,reviewId} = req.params;

    await review.findByIdAndDelete(reviewId);
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    
    res.redirect(`/listing/${id}`);
}))

module.exports = router;