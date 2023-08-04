export const onSaveError = (error, _, next) => {
    const { code, name } = error;
    error.status = (code === 11000 && name === "MongoServerError") ? 409 : 400;
    next();
};

export const onUpdateValidator = function (next) {
    this.options.runValidators = true;
    next();
}
