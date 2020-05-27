const { body } = require('express-validator');

const validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                body('email', 'Email field is invalid').isEmail(),
                body('password', 'Password field is empty').notEmpty()
            ]
        }

        case 'register': {
            return [
                body('email', 'Email field is invalid').isEmail(),
                body('password').isLength({ min: 5, max: 15 }).withMessage("Password must be between 5 and 15 characters")
                    .custom((value, { req, loc, path }) => {
                        if (value !== req.body.confirmPassword) {
                            // trow error if passwords do not match
                            throw new Error("Passwords don't match");
                        } else {
                            return value;
                        }
                    })
            ]
        }
    }
}

module.exports = validate