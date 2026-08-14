const dns = require('dns');
dns.setServers(['8.8.8.8']);

const mongoose = require('mongoose');

async function connectToDatabase() {
    await mongoose.connect("mongodb+srv://sevanthrao1406_db_user:cUCBtvUE5ysL5ao8@100xdevs.4kx41sj.mongodb.net/todo")
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