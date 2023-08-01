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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

}, { versionKey: false, timestamps: false })

contactsSchema.pre("findOneAndUpdate", onUpdateValidator)
contactsSchema.post("save", onSaveError)
contactsSchema.post("findOneAndUpdate", onSaveError)

export default contactsSchema


