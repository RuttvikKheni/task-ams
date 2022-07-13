const { validationResult } = require("express-validator");
const UsersModel = require("../models/users.model");
const AppointmentModel = require("../models/appointments.model");

async function appointmentBookController(req, res, next) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { time, doctor_id, patient_email, admin_id, date } = req.body;

        const appointmentDate = new Date(date);
        const formatedDate = `${appointmentDate.getMonth() + 1}/${appointmentDate.getDate()}/${appointmentDate.getFullYear()}`
        if (!(appointmentDate && appointmentDate > new Date()))
            throw Error("Invalid date");

        const doctor = await UsersModel.findById(doctor_id);
        if (!doctor)
            throw Error("doctor not found")

        const sameAppointment = await AppointmentModel.findOne({ doctor_id: doctor_id, patient_email, time, date: formatedDate });
        if (sameAppointment)
            throw Error("At that time you have already booked appointment for this doctor")

        const oldAppointments = await AppointmentModel.find({ doctor_id: doctor_id, time, status: "booked", date: formatedDate });
        if (oldAppointments.length)
            throw Error("At that time already booked for this doctor")

        let user, admin;
        if (admin_id) {
            admin = await UsersModel.findOne({ _id: admin_id, usertype: "admin" });
            if (!admin)
                throw Error("user not found")
        }

        if (patient_email) {
            user = await UsersModel.findOne({ email: patient_email, usertype: "patient" });
        }

        const appointment = new AppointmentModel({
            created_by_admin: admin?._id ? true : false, admin_id: admin?._id,
            doctor_id, time, is_guest: user?._id ? false : true,
            patient_email: patient_email, patient_id: user?._id, date
        });

        await appointment.save();

        res.status(200).json({
            error: false,
            msg: "appointment created success"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { appointmentBookController };