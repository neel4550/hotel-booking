const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        Description : Joi.string().required(),
        price : Joi.number().required().min(0),
        location : Joi.string().required(),
        country : Joi.string(),
        image : Joi.string().allow("", null),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        ratting:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})