import { HttpError } from "../helpers/index.js";

const emptyBodyCheck = (req, _, next) => {
    const { length } = Object.keys(req.body);
    if (!length) {
        next(HttpError(400, "fields must be required"))
    }
    next()
}

export default emptyBodyCheck;