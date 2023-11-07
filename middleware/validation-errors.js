const errorsHandler = (req, res) => {
    const validationErrors = {};

    for (const field in req.validErrors.errors) {
        validationErrors[field] = req.validErrors.errors[field].message;
    }

    res.status(400).render("signUp", { message: Object.values(validationErrors).join(', ') });
}

module.exports = errorsHandler;