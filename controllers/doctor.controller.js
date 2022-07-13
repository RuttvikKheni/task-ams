const AppointmentModel = require("../models/appointments.model");

async function myAppointment(req, res, next) {
    try {

        const { id } = req.user
        const { appointment_id } = req.params

        const appointment = await AppointmentModel.findOne({ _id: appointment_id, doctor_id: id });
        if (!appointment)
            throw Error("You have no appointments");

        res.status(200).json({
            msg: "appointment fethed",
            appointment
        });

    } catch (error) {
        next(error);
    }
}

async function myAppointments(req, res, next) {
    try {

        const { id } = req.user

        const appointments = await AppointmentModel.find({ doctor_id: id });
        if (!appointments.length)
            throw Error("You have no appointments");

        res.status(200).json({
            msg: "appointments fethed",
            appointments
        });

    } catch (error) {
        next(error);
    }
}

async function upadateAppointmentStatus(req, res, next) {
    try {

        const { appointment_id, status } = req.params;
        const { id } = req.user;

        const appointment = await AppointmentModel.findOne({ doctor_id: id, _id: appointment_id });
        if (!appointments)
            throw Error("Invalid appointment id");

        if (appointment.status == "canceled")
            throw Error("Appointment already canceled");

        if (appointment.status == "done")
            throw Error("Appointment already done");

        if (status === "done")
            if (appointment.status !== "booked")
                throw Error("Invalid request for this appointment");

        appointment.status = status;

        res.status(200).json({
            error: false,
            msg: "appointment status updated successfully",
        });

    } catch (error) {
        next(error);
    }
}

module.exports = { myAppointment, myAppointments, upadateAppointmentStatus };