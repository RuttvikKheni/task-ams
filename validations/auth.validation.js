const { checkSchema } = require('express-validator');

const authRegistrationValidation = checkSchema({
    "usertype": {
        in: ["params"],
        matches: {
            options: [/\b(?:admin|doctor|patient)\b/],
            errorMessage: "Invalid user type, value from 'admin', 'doctor' and 'patient'"
        }
    },
    "username": {
        in: ["body"],
        isEmpty: false,
        isString: {
            bail: true,
            errorMessage: "username is required"
        }
    },
    "email": {
        in: ["body"],
        isEmpty: false,
        isEmail: {
            bail: true,
            errorMessage: "Invalid email value"
        }
    },
    "password": {
        in: ["body"],
        isEmpty: false,
        isStrongPassword: {
            bail: true,
            errorMessage: "This is not a string password"
        }
    }
});

const authLoginValidation = checkSchema({
    "usertype": {
        in: ["params"],
        matches: {
            options: [/\b(?:admin|doctor|patient)\b/],
            errorMessage: "Invalid user type, value from 'admin', 'doctor' and 'patient'"
        }
    },
    "email": {
        in: ["body"],
        isEmpty: false,
        isEmail: {
            bail: true,
            errorMessage: "Invalid email value"
        }
    },
    "password": {
        in: ["body"],
        isEmpty: false,
        isStrongPassword: {
            bail: true,
            errorMessage: "This is not a string password"
        }
    }
});

module.exports = { authRegistrationValidation, authLoginValidation };