const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
require("dotenv").config();

const changeFormatRouter = require("./controller/chnageFormat.router");

const app = express();

// set cors
var corsOptions = {
    origin: process.env.origin,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// limit every ip to only send 100 request in each page every 5 minutes
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use(morgan("tiny"));

app.use("/", express.static(path.join(__dirname, "view")));
// use (changeFormatRouter) for any req comes to /
app.use("/processImage", cors(corsOptions), changeFormatRouter);

app.get("*", function (req, res) {
    res.status(404).sendFile(
        path.join(__dirname, "view", "notfound-page", "index.html")
    );
});

module.exports = app;
