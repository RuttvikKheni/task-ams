const { Router } = require("express");
const patientController = require("./../controllers/patient.controller");

const routes = Router();

routes.get("/appointments", patientController.myAppointments);
routes.get("/appointments/:appointment_id", patientController.myAppointment);

module.exports = routes;