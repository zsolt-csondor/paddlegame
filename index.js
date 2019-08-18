const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((request, response) => {

    let filePath = path.join(__dirname, "public", request.url === "/" ? "index.html" : request.url);
    let extension = path.extname(filePath);
    let contentType = "text/html";

    switch(extension) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if(error) {
            if(error.code === "ENOENT") {
                //page not found

                return;
            }
            else {
                //Some other random error lol
                return;
            }
        }

        //Success
        response.writeHead(200, {"contentType": contentType});
        response.end(content, "utf8");
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {console.log("Server running on port " + PORT)});
