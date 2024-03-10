const express = require("express");
const router = express.Router();
const listing = require ("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const {listingSchema} = require("../schema.js");

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new expressError(400, error);
    }else{
        next();
    }
}

//index route
router.get("/", wrapAsync(async (req, res)=>{
    const alllistings = await listing.find({});
    res.render("listings/index.ejs", {alllistings});
})
);

//new route
router.get("/new", (req, res)=>{
    res.render("listings/new");
})
//create route
router.post("/l", validateListing, wrapAsync(async (req, res, next)=>{
    let newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
})
);

//edit route
router.get("/:id/edit", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    const listingdetails = await listing.findById(id);
    res.render("/edit.ejs", {listingdetails});
}));
//update route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    if(!req.body.listing) {
        throw new expressError(400, "send valid data for listing!");
    }
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listing/${id}`);
})
);
//delete route
router.delete("/:id",  wrapAsync(async (req, res)=>{
    let {id} = req.params;
    let deletelisting = await listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listing");
})
);
//show route
router.get("/:id", wrapAsync (async (req, res)=>{
    let {id} = req.params;
    const listingdetails = await listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listingdetails});
})
);

module.exports = router;