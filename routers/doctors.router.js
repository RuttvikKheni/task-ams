const { Router } = require("express");
const doctorsController = require("../controllers/doctor.controller");

const routes = Router();

routes.get("/appointments", doctorsController.myAppointments);
routes.get("/appointments/:appointment_id", doctorsController.myAppointment);

routes.patch("/appointments/:appointment_id/status/:status(booked|canceled|done)", doctorsController.upadateAppointmentStatus);

module.exports = routes;