var http = require('http')

var server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"})
    response.end("<html><body><a href=\"https://reddit.com" + request.url + "\">https://reddit.com" + request.url + "</a></body></html>")
})

server.listen(process.env.PORT)