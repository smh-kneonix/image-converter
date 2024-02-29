const multer = require("multer");
let newPicName = "";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        //store pic in src/models/unformatedpics
        cb(null, "src/models/unformatedpics");
    },

    // named each pic by (time.format)
    filename: (req, file, cb) => {
        const picname = `${Date.now() + "-" + Math.round(Math.random() * 1e9)}`;

        // picname + original format
        newPicName = `${picname}.${file.mimetype.split("/")[1]}`;
        cb(null, newPicName);
    },
});

/**
 * filter file
 * @param {Object} req
 * @param {Object} file
 * @param {function} cb - the callback function to handle error and accept format
 */
const fileFilter = (req, file, cb) => {
    // sharp only accept JPEG, PNG, WebP, AVIF, TIFF, and SVG
    const fileFormat = file.mimetype;
    const acceptformat =
        fileFormat === "image/jpeg" ||
        fileFormat === "image/jpg" ||
        fileFormat === "image/png" ||
        fileFormat === "image/webp" ||
        fileFormat === "image/avif" ||
        fileFormat === "image/tiff" ||
        fileFormat === "image/svg";

    // only accept less than 5MB
    const fileSize = parseInt(req.headers["content-length"]);
    const acceptSize = fileSize < 1024 * 1024 * 5;

    if (acceptformat && acceptSize) {
        cb(null, true);
    } else if (!acceptformat) {
        cb("only accept JPEG, PNG, WebP, AVIF, TIFF, and SVG", false);
    } else if (!acceptSize) {
        cb("only accept picture up to 5MB", false);
    }
};

//set (storage,limits,fileFilter) for multer
const upload = multer({
    storage: storageConfig,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter: fileFilter,
});

function getUnformatedpicsName() {
    return newPicName;
}

module.exports = {
    upload,
    getUnformatedpicsName,
};
