const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

server.listen(5000, console.log('The server is up and running at http://localhost:5000'))

app.get('/', (req, res) => {
    res.send('The server is up and running!')
})

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ name, recipients, text }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)

            socket.broadcast.to(recipient).emit('receive-message', {
                name, recipients: newRecipients, sender: id, text
            })
        })
    })
})