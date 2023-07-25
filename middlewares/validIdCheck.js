import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const validIdCheck = (req, _, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) next(HttpError(404, `${id} is not valid`))
    next()
}

export default validIdCheck