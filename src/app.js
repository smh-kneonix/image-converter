const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const changeFormatRouter = require("./controller/chnageFormat.router");

const app = express();

// set cors
var corsOptions = {
  origin: process.env.origin,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(morgan("tiny"));

app.use("/",express.static(path.join(__dirname,"view"))); 
// use (changeFormatRouter) for any req comes to /changeformatpic
app.use("/processImage",cors(corsOptions) ,changeFormatRouter);

module.exports = app;
