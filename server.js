var config = require("./config.json");
var port = config.port || 8080;
var rootdir = config.rootdir || "page";

var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('./mime').types;
var path = require('path');


var onRequest = function(request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname.charAt(pathname.length - 1) == path.sep) {
        pathname += "index.html"; 
    }
    var realPath = path.join(rootdir, pathname);
    console.log("absolute path:"+path.resolve(realPath));
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("404 Not Found");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mime[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
};
var server = http.createServer(onRequest);
server.listen(port);
console.log("Server runing at port: " + port);
console.log("root dir : " + path.resolve(rootdir));
