const { Router } = require("express");
const AdminController = require("../controllers/admin.controller");

const routes = Router();

routes.get("/:usertype(doctor|patient)", AdminController.getUsers);

routes.delete("/:user_id/delete", AdminController.deleteUser);

routes.patch("/appointments/:appointment_id/status/:status(booked|canceled|done)", AdminController.upadateAppointmentStatus);

module.exports = routes;