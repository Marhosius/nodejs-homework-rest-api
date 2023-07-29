import HttpError from "../helpers/HttpError.js";

const validator = schema => {
    const func = (req, _, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    }
    return func;
}

export default validator;