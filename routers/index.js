const { Router } = require("express");
const AuthRouter = require("./auth.router");
const AppointmentRouter = require("./appointment.router");
const PatientsRouter = require("./patients.router");
const DoctorsRouter = require("./doctors.router");
const AdminRouter = require("./admin.router");
const loginOauth = require("../middlewares/loginOauth.middleware");

const routes = Router();

routes.use("/auth", AuthRouter);

routes.use("/appointment", AppointmentRouter);

routes.use("/:type(patient)", loginOauth, PatientsRouter);

routes.use("/:type(doctor)", loginOauth, DoctorsRouter);

routes.use("/:type(admin)", loginOauth, AdminRouter);


module.exports = routes;