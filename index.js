const express = require('express')
const app = express()
const rateLimit = require("express-rate-limit")
const PORT = process.env.PORT || 8000
const JSONdb = require('simple-json-db');
const db = new JSONdb(`${__dirname}/database.json`)

// Rate limiter
const limiter = rateLimit({
    windowMs: 100 * 60 * 100, // 10 minutes
    max: 100, // 100 requests max every 10 minutes
    message: "You are sending too many requests. Please try again later."
})

//API Requests
app.get('/*', (req, res, next) => {
    db.set('requests', (db.get('requests') + 1))
    console.log(`${req.headers['x-forwarded-for']}    ${req.connection.remoteAddress}     ${req.url}`)
    next()
})

//Endpoints
app.get('/hello', (req, res) => {
    res.status(200).send({
      message: "Hello World!"
    });
});

app.get('/cats', (req, res) => {
    res.send({
        jpg: "https://cdn.universal-network.xyz/cats/" + 'cat%20' + '(' + Math.floor(Math.random() * 153) + ')' + ".jpg", jpeg: "https://cdn.universal-network.xyz/cats/" + 'cat%20' + '(' + Math.floor(Math.random() * 37) + ')' + ".jpeg"
    });
});

// Listen on port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

app.listen(3000, () => {
    console.log('API Online');
});
