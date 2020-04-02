const http = require('http')
const pro = require('./app')

var server = http.createServer(pro)

server.listen(8000)