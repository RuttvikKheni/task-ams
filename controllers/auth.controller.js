const { compareSync } = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const UsersModel = require("./../models/users.model");

async function userRegistration(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password } = req.body;
        const { usertype } = req.params;

        const user = new UsersModel({ username, email, password, usertype });

        const token = await jwt.sign({ email, username, usertype }, process.env.JWT_SIGN_KEY, { expiresIn: "24h" });

        user.current_token = token;

        await user.save();

        return res.status(200).json({
            error: false,
            message: `${usertype} Created`,
            data: {
                token: token,
                expiresIn: "after 24 hours"
            }
        });

    } catch (error) {
        next(error);
    }
}

async function userLogin(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const { usertype } = req.params;

        const user = await UsersModel.findOne({ email, usertype });

        if (!user)
            throw Error("User not found");

        const isValidPassword = await compareSync(password, user.password);
        if (!isValidPassword)
            throw Error("password incorrect");

        const token = await jwt.sign({ email, username: user.username, usertype: user.usertype }, process.env.JWT_SIGN_KEY, { expiresIn: "24h" });
        user.current_token = token;
        await user.save();

        return res.status(200).json({
            error: false,
            message: `login successfully done`,
            data: {
                token: token,
                expiresIn: "after 24 hours"
            }
        });

    } catch (error) {
        next(error);
    }
}

module.exports = { userRegistration, userLogin };