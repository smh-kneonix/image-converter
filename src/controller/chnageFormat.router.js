const express = require("express");
const { changePicFormat} = require("./changeFormat.controller");
const { upload } = require("./fileHandler");

const changeFormatRouter = express.Router();

/**
 *  POST /changeformatpic/:targetformat
 *
 *  change format pic controller and add (multer) upload for getting pic as req.file
 *  have multer as a middleware for handling file upload
 */
changeFormatRouter.post(
    "/:targetformat",
    upload.single("image"),
    changePicFormat
);

module.exports = changeFormatRouter;
