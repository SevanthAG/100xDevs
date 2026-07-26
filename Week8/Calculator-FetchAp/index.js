const express = require('express');
const path = require('node:path');

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/sum', (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const sum = a + b;
    res.json({
        result: sum
    });
});

app.post('/sub', (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const sub = a - b;
    res.json({
        result: sub
    });
});

app.post('/mul', (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const mul = a * b;
    res.json({
        result: mul
    });
});

app.post('/div', (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const div = a / b;
    res.json({
        result: div
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})