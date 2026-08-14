const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./midlleware');
const  { userModel, todoModel, connectToDatabase } = require('./models');

const app = express();

async function startServer() {
    await connectToDatabase();
    console.log('Connected to database');
}

// let users = [];
// let userId = 1;

// let todos = [];
// let todoId = 1;

app.use(express.json());

app.post('/signup', async  (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await userModel.findOne({ 
        username : username
    });

    if (userExists) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // users.push({
    //     id: userId++,
    //     username,
    //     password
    // });
    await userModel.create({
        username: username,
        password: password
    });

    res.status(201).json({ 
        message: 'User signed up successfully',
    });
})

app.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userAlreadyExists = await userModel.findOne({ 
        username : username,
        password : password
     });

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

app.post('/todos',authMiddleware, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;

    await todoModel.create({
        userId,
        title,
        description
    });

    res.status(201).json({
        message: 'Todo created successfully'
    });
})

app.get('/todos', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const userTodos = await todoModel.find({ userId });

    res.status(200).json({
        todos: userTodos
    });
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    startServer();
});