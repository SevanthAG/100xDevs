const mongoose = require('mongoose');

async function connectToDatabase() {
    await mongoose.connect("URL")
}

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const todoSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    title: String,
    description: String
})

const userModel = mongoose.model('User', userSchema);
const todoModel = mongoose.model('Todo', todoSchema);

module.exports = {
    userModel: userModel,
    todoModel: todoModel,
    connectToDatabase: connectToDatabase
}