const errorsHandler = (req, res) => {
    const validationErrors = {};

    for (const field in req.validErrors.errors) {
        validationErrors[field] = req.validErrors.errors[field].message;
    }

    res.status(400).json({ message: validationErrors });
}

module.exports = errorsHandler;