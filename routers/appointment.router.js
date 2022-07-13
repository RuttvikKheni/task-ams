const { Router } = require("express");
const loginOauth = require("../middlewares/loginOauth.middleware");
const { appointmentBookValidator } = require("../validations/appointment.validation");
const AppointmentController = require("./../controllers/appointment.controller");

const routes = Router();

routes.post("/book", appointmentBookValidator, AppointmentController.appointmentBookController);

module.exports = routes;