const http = require("http");
const app = require("./app");
require("dotenv").config();
//we config the main port in package.json
const PORT = process.env.PORT || 8000;

//create http server
const server = http.createServer(app);

function startServer() {
    // start server from app
    server.listen(PORT, () => {
        console.log(`app run on port: ${PORT}`);
    });
}
startServer()
