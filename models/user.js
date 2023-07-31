import { Schema, model } from "mongoose";

import { onSaveError, onUpdateValidator } from "../schema/hooks.js";

import userSchemaDB from "../schema/userSchemaDB.js";


userSchemaDB.pre("findOneAndUpdate", onUpdateValidator);

userSchemaDB.post("save", onSaveError);

userSchemaDB.post("findOneAndUpdate", onSaveError);

const User = model("user", userSchemaDB);

export default User;