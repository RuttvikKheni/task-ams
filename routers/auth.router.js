const { Router } = require("express");
const { authRegistrationValidation, authLoginValidation } = require("../validations/auth.validation");
const AuthController = require("./../controllers/auth.controller");

const routes = Router();

routes.post("/registration/:usertype", authRegistrationValidation, AuthController.userRegistration);

routes.post("/login/:usertype", authLoginValidation, AuthController.userLogin);

module.exports = routes;