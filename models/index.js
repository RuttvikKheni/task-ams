const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connecticon successfully");
    })
    .catch((err) => {
        console.log(err);
    });