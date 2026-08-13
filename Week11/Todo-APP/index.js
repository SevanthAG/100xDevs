const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./midlleware');

const app = express();

let users = [];
let userId = 1;

let todos = [];
let todoId = 1;

app.use(express.json());

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    users.push({
        id: userId++,
        username,
        password
    });

    res.status(201).json({ 
        message: 'User signed up successfully',
    });
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

app.post('/todos',authMiddleware, (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;

    todos.push({
        id: todoId++,
        userId,
        title,
        description
    });

    res.status(201).json({
        message: 'Todo created successfully'
    });
})

app.get('/todos', authMiddleware, (req, res) => {
    const userId = req.userId;
    const userTodos = todos.filter(todo => todo.userId === userId);

    res.status(200).json({
        todos: userTodos
    });
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});