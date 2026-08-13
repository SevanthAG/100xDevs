const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

let users = [];
let userId = 1;

app.use(express.json());

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    users.push({
        username,
        password
    });

    res.status(201).json({ message: 'User signed up successfully' });
})

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userAlreadyExists = users.find(user => user.username === username && user.password === password);

    if (!userAlreadyExists) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({
        userId: userAlreadyExists.id
    }, "todo-secret");


    res.status(200).json({
        message: 'User signed in successfully',
        token
    });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});