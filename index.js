const express = require('express')
const app = express()
const rateLimit = require("express-rate-limit")
const PORT = process.env.PORT || 8000


// Rate limiter
const limiter = rateLimit({
    windowMs: 100 * 60 * 100, // 10 minutes
    max: 100, // 100 requests max every 10 minutes
    message: "You are sending too many requests. Please try again later."
})

app.get('/hello', (req, res) => {

    res.status(200).send({
        url: "Hello World!"
    });
});

// Listen on port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

app.listen(3000, () => {
    console.log('API Online');
});
