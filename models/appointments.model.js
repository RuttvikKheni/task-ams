const { Schema, Types, model } = require('mongoose');

const time_enum = ["09AM", "10AM", "11AM", "12AM", "01PM", "03PM", "04PM", "05PM", "06PM"];

function appointmentDateFormat(value) {
    const date = new Date(value);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const appointmentSchema = new Schema({
    patient_id: {
        type: Types.ObjectId,
        ref: "users",
    },
    patient_email: {
        type: String,
        ref: "users",
        required: [true, "patient email required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Wrong email syntex"],
        trim: true
    },
    is_guest: {
        type: Boolean,
        default: false
    },
    admin_id: {
        type: Types.ObjectId,
        ref: "users",
    },
    created_by_admin: {
        type: Boolean,
        default: false
    },
    doctor_id: {
        type: Types.ObjectId,
        ref: "users",
        required: [true, "doctor id required"],
    },
    time: {
        enum: time_enum,
        required: [true, "Invalid value"],
        type: String,
    },
    date: {
        required: [true, "Invalid value"],
        set: appointmentDateFormat,
        type: String,
    },
    status: {
        enum: ["pening", "booked", "done", "canceled"],
        default: "pening",
        type: String,
    }
},
    {
        timestamps: true
    }
);
module.exports = model('appointments', appointmentSchema);
exports.time_enum = time_enum;