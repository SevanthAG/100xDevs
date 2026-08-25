const dns = require("dns");

dns.setServers([
    "1.1.1.1",
    "1.0.0.1",
]);

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sevanthrao1406_db_user:cUCBtvUE5ysL5ao8@100xdevs.4kx41sj.mongodb.net/Trello-Board")

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const organizationSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    admin: mongoose.Types.ObjectId,
    members: [mongoose.Types.ObjectId]
})

const boardSchema = new mongoose.Schema({
    Title = String,
    organizationId: mongoose.Types.ObjectId
})

const issueSchema = new mongoose.Schema({
    Title: String,
    boardId: mongoose.Types.ObjectId,
    state: String
})

const userModel = mongoose.model("user", userSchema);
const organizationModel = mongoose.model("organization", organizationSchema);
const boardModel = mongoose.model("board", boardSchema);
const issueModel = mongoose.model("issue", issueSchema)


module.exports = {
    userModel: userModel,
    organizationModel: organizationModel,
    boardModel: boardModel,
    issueModel: issueModel
}