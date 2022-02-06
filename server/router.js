const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('The server is up and running!').status(200)
})

module.exports = router