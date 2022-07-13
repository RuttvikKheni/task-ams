const { genSaltSync, hashSync } = require('bcryptjs');
const { Schema, model } = require('mongoose')

function encodedPassword(password) {
    return hashSync(password, genSaltSync(10));
}

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username required"],
        trim: true,
    },
    usertype: {
        type: String,
        enum: ["admin", "doctor", "patient"],
        required: [true, "User type required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email required"],
        // unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Wrong email syntex"],
        trim: true,
    },
    password: {
        type: String,
        required: true,
        required: [true, "Password required"],
        set: encodedPassword,
        trim: true,
    },
    current_token: {
        type: String,
        trim: true,
    }
},
    {
        timestamps: true
    }
)

module.exports = model('users', userSchema);