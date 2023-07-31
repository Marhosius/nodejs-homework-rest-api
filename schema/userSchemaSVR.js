import Joi from "joi";

import { emailRegexp } from "../constants/userConstants.js";

const userSignupSchemaSVR = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const userSigninSchemaSVR = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export default {
    userSignupSchemaSVR,
    userSigninSchemaSVR,
}