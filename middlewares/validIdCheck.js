import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const validIdCheck = (req, _, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) next(HttpError(404, `${contactId} is not valid`))
    next()
}

export default validIdCheck