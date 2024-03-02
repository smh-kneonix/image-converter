const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const {getUnformatedpicsName} = require("./fileHandler");

/**
 *  Change the format of the picture based on the target format.
 * @param {Object} req
 * @param {Object} res
 */
async function changePicFormat(req, res) {
    
    // Change the format of the picture based on the target format

    const targetFormat = req.params.targetformat;
    const isAcceptableFormat = checkTargetFormat(targetFormat);
    if (!isAcceptableFormat) {
        return res.status(400).json("parameter not support");
    }

    await changeFormatPic(targetFormat, res);
}

/**
 * Checks if the given target format is acceptable.
 *
 * @param {string} targetFormat - The format to be checked
 * @return {boolean} true if the format is acceptable, false otherwise
 */
function checkTargetFormat(targetFormat) {
    const acceptableFormat = [
        "jpeg",
        "jpg",
        "jpe",
        "png",
        "avif",
        "tiff",
        "tif",
        "webp",
    ];
    return acceptableFormat.some((el) => el === targetFormat);
}

/**
 * change format pic function
 * @param {string} targetFormat - format of the picture
 * @param {Object} res - response
 * @param {string} ip - ip of the user
 * @returns {res.json} - response which is the path of the formatted pic or an error
 */
async function changeFormatPic(targetFormat, res) {
    const picname = `${Date.now() + "-" + Math.round(Math.random() * 1e9)}`;
    const pathOfModelsFile = path.join(__dirname, "../", "models");
    const formattedPicName = path.join(
        pathOfModelsFile,
        "formatedpics",
        `output${picname}.${targetFormat}`
    );
    const pathUnformattedPic = path.join(pathOfModelsFile,'unformatedpics',getUnformatedpicsName())

    await sharp(pathUnformattedPic)
        // .sharpen({ sigma: 2 })
        .toFormat(`${targetFormat}`)
        .toFile(formattedPicName, (err, info) => {
            if (err) {
                console.log(`something happened while formatting: ${err}`);
                return res.json(`soothing happened while formatting`);
            }

            //send the formatted pic as response
            res.sendFile(formattedPicName);

            // after half second delete formatted and unformatted picture
            setTimeout(() => {
                sharp.cache(false)
                deletePhoto(formattedPicName);
                deletePhoto(pathUnformattedPic);
            }, 100);
        });
}

async function deletePhoto(picPath) {
    fs.unlinkSync(picPath, (err) => {
        console.log(`something happened while deleting: ${err}`);
    });
}

module.exports = {
    changePicFormat,
};
