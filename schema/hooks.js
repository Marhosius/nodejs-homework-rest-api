export const onSaveError = (error, _, next) => {
    error.status = 400;
    next()
}

export const onUpdateValidator = function (next) {
    this.options.runValidators = true;
    next();
}
