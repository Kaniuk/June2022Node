const authValidator = require('../validators/auth.validators');
const ApiError = require("../error/ApiError");


module.exports = {
    isBodyValid: (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

            if (!validate) {
                throw new ApiError(validate.error.message);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};