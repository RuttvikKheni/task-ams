const UsersModel = require("../models/users.model");
const AppointmentModel = require("../models/appointments.model");

async function getUsers(req, res, next) {
    try {

        const { usertype } = req.params;

        const users = await UsersModel.find({ usertype }).select(["-password", "-current_token", "-__v"]);

        if (!users.length)
            throw Error(`${usertype} not found`);
        return res.status(200).json({
            error: false,
            msg: `${usertype} fetched`,
            [`${usertype}s`]: users
        });

    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    try {
        const { user_id } = req.params;

        const user = await UsersModel.findByIdAndDelete(user_id);
        if (!user)
            throw Error("User not found");

        return res.status(200).json({
            error: false,
            msg: `user deleted`,
            user: user
        });

    } catch (error) {
        next(error);
    }
}

async function upadateAppointmentStatus(req, res, next) {
    try {
        const { appointment_id, status } = req.params;
        const { id } = req.user;

        const appointment = await AppointmentModel.findById(appointment_id);
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

module.exports = { getUsers, deleteUser, upadateAppointmentStatus };