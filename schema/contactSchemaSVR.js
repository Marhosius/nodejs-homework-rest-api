import Joi from "joi";

const contactsSchemaSRV = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`,
    }),
    email: Joi.string().required().messages({
        "any.required": `missing required email field`,
    }),
    phone: Joi.string().required().messages({
        "any.required": `missing required phone field`,
    }),
    favorite: Joi.boolean(),
});

const favoriteTogleSchemaSRV = Joi.object({
    favorite: Joi.boolean().required().messages(
        { "message": "missing field favorite" }),
});



export default { contactsSchemaSRV, favoriteTogleSchemaSRV }