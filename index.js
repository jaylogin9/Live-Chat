const express = require('express')
const app = express()
const compression = require('compression');
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000
// compress all responses
app.use(compression());

http.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        console.info(`Socket ${socket.id} says: "${msg}"`);
        console.log(socket.handshake.headers)
        socket.broadcast.emit('message', msg)
    })
    socket.on('disconnect',()=> {
        console.log('A user disconnected');
    })

})
