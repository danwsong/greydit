var http = require('http')

var server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"})
    response.end("Hello World\n")
    console.log(request.url)
})

server.listen(process.env.PORT)