const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require("cors")
const { authMiddleware } = require('./midleware')
const { userModel, organizationModel, boardModel, issueModel } = require("./model")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(cors())


// Authentication Endpoint
app.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const userExists = await userModel.findOne({
        username: username
    })

    if (userExists) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    const newUser = await userModel.create({
        username: username,
        password: password
    })

    res.status(201).json({
        userId: newUser._id,
        message: 'User created successfully'
    })
});

app.post('/signin', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const userAlreadyExists = await userModel.findOne({
        username: username,
        password: password
    })

    if (!userAlreadyExists) {
        return res.status(400).json({
            message: 'Invalid username or password'
        })
    }

    const token = jwt.sign({
        userId: userAlreadyExists.id,
    }, "helloSecret")

    res.json({
        message: 'User signed in successfully',
        token
    })
})

// Post EndPoints
app.post('/Organization', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const title = req.body.Title;
    const description = req.body.description;

    const newOrganization = await organizationModel.create({
        Title: title,
        Description: description,
        admin: userId,
        members: []
    })

    res.json({
        message: 'Organization created successfully',
        id: newOrganization._id
    })
})

app.post('/add-member-to-organization', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserName = req.body.memberUserName;

    const organization = await organizationModel.findOne({
        _id: organizationId
    });

    if (!organization) {
        return res.status(404).json({
            message: "Organization not found"
        });
    }

    if (organization.admin.toString() !== userId.toString()) {
        return res.status(403).json({
            message: "Only the organization admin can add members"
        });
    }

    const memberUser = await userModel.findOne({
        username: memberUserName
    });

    if (!memberUser) {
        return res.status(403).json({
            message: "Member Not Found"
        });
    }
    organization.members.push(memberUser._id);

    await organization.save();

    console.log("Updated members:", organization.members);

    res.json({
        message: 'Member added to organization successfully'
    })
})


app.post('/Board', authMiddleware, async (req, res) => {
    const userId = req.userId;

    const OrganizationId = req.body.organizationId;
    const title = req.body.Title;

    const organization = await organizationModel.findOne({
        _id: organizationId
    })

    if (!organization) {
        return res.status(404).json({
            message: 'Organization not found'
        });
    }

    const isThatMemberOfOrganization = await organizationModel.findOne({
        _id: userId
    })

    if (!isThatMemberOfOrganization) {
        return res.status(404).json({
            message: "Ur Not the member of organization"
        })
    }

    const newBoard = await boardModel.create({
        Title: title,
        organizationId: OrganizationId
    })

    res.json({
        message: 'Board created successfully',
        id: newBoard._id
    })
})

app.post('/Issue', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const boardId = req.body.boardId;
    const title = req.body.Title;
    const state = req.body.state; //NEXT, IN_PROGRESS, DONE

    const board = boardModel.findOne({
        _id: boardId
    })

    if (!board) {
        return res.status(404).json({
            message: 'Board not found'
        });
    }

    const newIssue = await issueModel.create({
        Title: title,
        boardId: boardId,
        state: state
    })

    res.json({
        message: 'Issue created successfully',
        id: newIssue._id
    })
})


// Get EndPoints
// It only accesible To admin
app.get('/Organization', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const OrganizationId = req.query.organizationId;

    const organization = await organizationModel.findOne({
        _id: OrganizationId
    })

    if (!organization) {
        return res.status(404).json({
            message: 'Organization not found'
        });
    }

    if (organization.admin.toString() !== userId) {
        return res.status(403).json({
            message: 'Access denied'
        });
    }

    const allMembers = await userModel.find({
        _id: organization.members
    })

    res.json({
        message: 'Organization fetched successfully',
        organization: {
            title: organization.Title,
            description: organization.Description,
            members: allMembers.map(member => ({
                id: member._id,
                username: member.username
            })
            )
        }
    })
});

app.get('/Boards', authMiddleware, (req, res) => {
    const userId = req.userId;
    const OrganizationId = req.query.organizationId;

    const organization = await organizationModel.findOne({
        _id: OrganizationId
    })

    if (!organization) {
        return res.status(404).json({
            message: 'Organization not found'
        });
    }

    const boards = await boardModel.find({
        organizationId: organizationId
    })

    res.json({
        message: 'Boards fetched successfully',
        boards: {
            Title: boards.Title,
            organizationId: boards.organizationId
        }
    })
})

app.get('/Issues', authMiddleware, (req, res) => {
    const userId = req.userId;
    const boardId = req.query.boardId;

    const board = BOARDS.find(board => board.BoardId === boardId);

    if (!board) {
        return res.status(404).json({ message: 'Board not found' });
    }

    const issues = ISSUES.filter(issue => issue.boardId === boardId);

    res.json({
        message: 'Issues fetched successfully',
        issues: issues
    })
})


// Delete Endpoint
app.delete('/members', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserName = req.body.memberUserName;

    const organization = await organizationModel.findOne({
        _id: organizationId
    });

    if (!organization) {
        return res.status(404).json({
            message: "Organization not found"
        });
    }

    if (organization.admin.toString() !== userId) {
        return res.status(403).json({
            message: "Only the organization admin can add members"
        });
    }

    const memberUser = await userModel.findOne({
        username: memberUserName
    });

    if (!memberUserName) {
        return res.status(404).json({
            message: 'Member not found'
        });
    }

    organization.members.pull(memberUser._id);
    await organization.save();

    res.json({
        message: 'Member deleted from organization'
    })

})

app.listen(3000)
