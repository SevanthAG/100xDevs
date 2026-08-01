const express = require('express');
const app = express()
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./middleware');
const path = require('path');
const port = 3000

app.use(cors());
app.use(express.json());


app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '../Week9/frontend/signin.html'))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../Week9/frontend/signup.html'))
})

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../Week9/frontend/index.html'))
})


const notes = []
const users = []

app.post('/signup', (req, res) => {
    // Handle POST request for user signup
    const username = req.body.username;
    const password = req.body.password;

    const userAlreadyExists = users.find(user => user.username === username);

    if (userAlreadyExists) {
        return res.status(403).json({ message: "User already exists" });
    }

    users.push({
        username: username,
        password: password
    });

    res.json({
        message: "User created successfully"
    });
})

app.post('/signin', (req, res) => {
    // Handle POST request for user signin
    const username = req.body.username;
    const password = req.body.password;

    const userAlreadyExists = users.find(user => user.username === username && user.password === password);

    if (!userAlreadyExists) {
        return res.status(403).json({
            message: "Invalid username or password"
        });
    }

    const token = jwt.sign({
        username: username
    }, "sevanth"
    );

    res.json({
        message: "User signed in successfully",
        token: token
    });
})



app.post('/notes', authMiddleware, (req, res) => {
    const note = req.body.note;
    notes.push({ note, username: req.username });
    res.json({
        message: "Done!"
    })
})


app.get('/notes', authMiddleware, (req, res) => {
    const userNotes = notes.filter(note => note.username === req.username);
    res.json({
        notes: userNotes
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})