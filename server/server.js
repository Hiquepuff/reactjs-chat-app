require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
const PORT  = process.env.PORT || 5000

const cors = require('cors')
const router = require('./router')
app.use(cors())
app.use(router)

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

server.listen(PORT, () => console.log('The server is up and running!'))