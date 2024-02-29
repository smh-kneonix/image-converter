const request = require("supertest");
const path = require("path");
require("dotenv").config();
const app = require("../../app");
const pathTestPicJPG = path.join(__dirname, "/testPics", "/testjpg.jpg");
const pathTestPicGIF = path.join(__dirname, "/testPics", "/testgif.gif");
const pathTestPicSize = path.join(__dirname, "/testPics", "/testsize.jpg");

const url = `http://localhost:${process.env.PORT}`;

describe("test processImage", function () {
    describe("Test POST /processImage/jpeg", function () {
        test("It should respond with 200 success", async function () {
            const response = await request(app)
                .post("/processImage/jpeg")
                .attach("image", `${pathTestPicJPG}`)
                .expect("Content-Type", "image/jpeg")
                .expect(200);
        });
    });
    describe("Test POST /processImage/jpg", function () {
        test("It should respond with 200 success", async function () {
            const response = await request(app)
                .post("/processImage/jpg")
                .attach("image", `${pathTestPicJPG}`)
                .expect("Content-Type", "image/jpeg")
                .expect(200);
        });
    });
    describe("Test POST /processImage/jpe", function () {
        test("It should respond with 200 success", async function () {
            const response = await request(app)
                .post("/processImage/jpe")
                .attach("image", `${pathTestPicJPG}`)
                .expect("Content-Type", "image/jpeg")
                .expect(200);
        });
    });
    describe("Test POST /processImage/png", function () {
        test("It should respond with 200 success", async function () {
            const response = await request(app)
                .post("/processImage/png")
                .attach("image", `${pathTestPicJPG}`)
                .expect("Content-Type", "image/png")
                .expect(200);
        });
    });
    describe("Test POST /processImage/tiff", function () {
        test("It should respond with 200 success", async function () {
            const response = await request(app)
                .post("/processImage/tiff")
                .attach("image", `${pathTestPicJPG}`)
                .expect("Content-Type", "image/tiff")
                .expect(200);
        });
    });
    describe("Test POST /processImage/tif", function () {
        test("It should respond with 200 success", async function () {
            const response = await request(app)
                .post("/processImage/tif")
                .attach("image", `${pathTestPicJPG}`)
                .expect("Content-Type", "image/tiff")
                .expect(200);
        });
    });
    describe("Test POST /processImage/webp", function () {
        test("It should respond with 200 success", async function () {
            const response = await request(app)
                .post("/processImage/webp")
                .attach("image", `${pathTestPicJPG}`)
                .expect("Content-Type", "image/webp")
                .expect(200);
        });
    });

    // test with wrong target format
    describe("Test wrong target POST /processImage/gif", function () {
        test("It should respond with 400 bad request", async function () {
            const response = await request(app)
                .post("/processImage/gif")
                .attach("image", `${pathTestPicJPG}`)
                .expect("Content-Type", /json/)
                .expect(400);
        });
    });

    // test with wrong input picture
    describe("Test wrong input POST /processImage/tiff", function () {
        test("It should respond with 500 server error", async function () {
            const response = await request(app)
                .post("/processImage/tiff")
                .attach("image", `${pathTestPicGIF}`)
                .expect("Content-Type", /html/)
                .expect(500);
        });
    });

    // test with large input picture
    describe("Test wrong size POST /processImage/tiff", function () {
        test("It should respond with 500 server error", async function () {
            const response = await request(app)
                .post("/processImage/tiff")
                .attach("image", `${pathTestPicSize}`)
                .expect("Content-Type", /html/)
                .expect(500);
        });
    });
});
