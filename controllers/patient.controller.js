const AppointmentModel = require("./../models/appointments.model");

async function myAppointment(req, res, next) {
    try {

        const { email } = req.user
        const { appointment_id } = req.params

        const appointment = await AppointmentModel.findOne({ _id: appointment_id, patient_email: email });
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

        const { email } = req.user

        const appointments = await AppointmentModel.find({ patient_email: email });
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

module.exports = { myAppointment, myAppointments };