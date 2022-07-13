const { verify } = require("jsonwebtoken");
const UsersModel = require("../models/users.model");

async function loginOauth(req, res, next) {

    try {
        const { type } = req.params;
        const authorization = req.header("authorization");

        if (!authorization)
            throw Error("Unauthorised request");

        const token = authorization.split(" ")[1];
        if (!token)
            throw Error("Unauthorised request");

        const requestUser = await verify(token, process.env.JWT_SIGN_KEY);

        const user = await UsersModel.findOne({ email: requestUser.email, usertype: requestUser.usertype });
        if (!user)
            throw Error("User not found");

        if (type !== user.usertype)
            throw Error("Invalid user request");

        if (user.current_token !== token)
            throw Error("old token");

        req.user = {
            id: user._id,
            email: user.email,
            usertype: user.usertype,
            username: user.username
        }
        req.body = {
            ...req.body,
            usertype: user.usertype,
        }

        next();
    } catch (error) {
        next(error);
    }

}

module.exports = loginOauth;