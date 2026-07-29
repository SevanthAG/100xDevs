const express = require('express');
const app = express()
const cors = require('cors');

app.use(cors());
app.use(express.json());
const path = require('path');
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Week9/frontend/index.html'))
})


const notes = []

app.post('/notes', (req, res) => {
    // Handle POST request for creating notes
    const note = req.body.note;

    notes.push(note);

    res.json({
        message: "Done!"
    })
})


app.get('/notes', (req, res) => {
    // Handle GET request for retrieving notes
    res.json({
        notes: notes
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})