const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

app.post('/login', (req, res) => {
    if (req.body.username !== 'Apip') {
        res.status(400).send('Invalid username')
        return
    }
    if (req.body.password !== 'Apip123') {
        res.status(401).send('Invalid password')
        return
    }
    res.send('login seccessfully')
})

/// 404 Not Found
app.use((req, res) => {
    res.status(404);
    res.send('<h1>404 Not Found<h1>')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})