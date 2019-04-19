var http = require('http')
var https = require('https')
var xml2js = require('xml2js')

var server = http.createServer((req, res) => {
    var path = req.url

    https.get('https://www.reddit.com' + path + '.rss', (response) => {
        var xml = ''
        response.on('data', (chunk) => {
            xml += chunk
        })
        response.on('end', () => {
            xml2js.parseString(xml, (err, result) => {
                console.dir(result)
                if (result['feed']) {
                    res.writeHead(200, {'content-type': 'text/html'})
                    var html = '';
                    html += '<html>';
                    html += '<body>';
                    if ('feed' in result) {
                        var feed = result['feed'];
                        if ('title' in feed) {
                            html += '<h1>' + feed['title'][0] + '</h1>'
                        }
                        if ('subtitle' in feed) {
                            html += '<h3>' + feed['subtitle'][0] + '</h3>'
                        }
                        if ('entry' in feed) {
                            html += '<div id=\'feed\'>'
                            feed['entry'].forEach((entry) => {
                                html += '<p><a href=\'' + entry['link'][0]['$']['href'] + '\'>' + entry['title'] + '</a></p>'
                            });
                            html += '</div>'
                        }
                    } else {
                        html += '<p>An error occurred.</p>'
                    }
                    html += '</body>';
                    html += '</html>';
                    res.end(html)
                }
            })
        })
    }).on('error', (err) => {
        console.error(err)
    })
})

server.listen(process.env.PORT)