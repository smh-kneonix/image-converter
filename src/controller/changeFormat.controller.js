const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { getUnformatedpicsName } = require("./fileHandler");

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
    const picName = `${Date.now() + "-" + Math.round(Math.random() * 1e9)}`;
    const pathOfModelsFile = path.join(__dirname, "../", "models");
    const formattedPicName = path.join(
        pathOfModelsFile,
        "formatedpics",
        `output${picName}.${targetFormat}`
    );
    const pathUnformattedPic = path.join(
        pathOfModelsFile,
        "unformatedpics",
        getUnformatedpicsName()
    );

    try {
        // Disable Sharp cache to manage memory usage
        sharp.cache(false);

        // Use Sharp to format the image
        await sharp(pathUnformattedPic)
            .toFormat(`${targetFormat}`)
            .toFile(formattedPicName);

        // Send the formatted picture as response
        res.on("finish", async () => {
            try {
                await deletePhoto(formattedPicName);
                await deletePhoto(pathUnformattedPic);
                console.log(`Deleted formatted and unformatted images.`);
            } catch (deleteErr) {
                console.error(`Error deleting files: ${deleteErr}`);
            }
        });

        // Send the formatted picture as response
        res.sendFile(formattedPicName);
        console.log({ targetFormat, picName, formattedPicName });
    } catch (err) {
        console.log(`Something happened while formatting: ${err}`);
        res.json(`Something happened while formatting`);
    }
}

async function deletePhoto(picPath) {
    fs.unlinkSync(picPath, (err) => {
        console.log(`something happened while deleting: ${err}`);
    });
}

module.exports = {
    changePicFormat,
};
