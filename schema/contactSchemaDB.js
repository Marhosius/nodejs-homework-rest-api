import { Schema } from "mongoose";
import { onSaveError, onUpdateValidator } from "./hooks.js";

const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },

})

contactsSchema.pre("findOneAndUpdate", onUpdateValidator)
contactsSchema.post("save", onSaveError)
contactsSchema.post("findOneAndUpdate", onSaveError)

export default {
    contactsSchema,
}



// import Joi from "joi";

// const contactsSchema = Joi.object({
//     name: Joi.string().required().messages({
//         "any.required": `missing required name field`,
//     }),
//     email: Joi.string().required().messages({
//         "any.required": `missing required email field`,
//     }),
//     phone: Joi.string().required().messages({
//         "any.required": `missing required phone field`,
//     })
// }).required().messages({
//     "any.required": "missing fields",
// });
