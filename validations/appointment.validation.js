const { checkSchema } = require('express-validator');
const { time_enum } = require("../models/appointments.model");

const appointmentBookValidator = checkSchema({
    "time": {
        in: "body",
        isEmpty: false,
        matches: {
            options: [/\b(?:09AM|10AM|11AM|12AM|01PM|03PM|04PM|05PM|06PM)\b/],
            errorMessage: `Invalid time value, value must be ${time_enum}`
        }
    },
    date: {
        in: "body",
        notEmpty: {
            bail: true,
            errorMessage: "Invalid value of date"
        }
    },
    "doctor_id": {
        in: "body",
        notEmpty: {
            bail: true,
            errorMessage: "Invalid value of doctor id"
        },
        isString: {
            bail: true,
            errorMessage: "Invalid value of doctor id"
        }
    },
    "patient_email": {
        in: "body",
        optional: true,
        isEmail: {
            bail: true,
            errorMessage: "Invalid mail"
        }
    },
    "admin_id": {
        in: "body",
        optional: true,
        notEmpty: {
            bail: true,
            errorMessage: "Invalid value of admin id"
        },
    }
});

module.exports = { appointmentBookValidator };