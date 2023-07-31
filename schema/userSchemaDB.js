import { emailRegexp } from "../constants/userConstants.js";
import { Schema } from "mongoose";

const userSchemaDB = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
}, { versionKey: false, timestamps: true });

export default userSchemaDB