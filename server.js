require('dotenv').config();
const express = require('express');

require('./models');
const router = require("./routers");

const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to Appointment Management System');
});

app.use("/api", router);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        msg: err.message || "Something wrong here"
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});