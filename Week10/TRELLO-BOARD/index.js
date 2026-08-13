const express = require('express')
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('./midleware')

const app = express()

app.use(express.json())

const USERS = []
const ORGANIZATIONS = []
const BOARDS = []
const ISSUES = []

let user_Id = 1;
let organization_Id = 1;
let board_Id = 1;
let issue_Id = 1;


// Authentication Endpoint
app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const userExists = USERS.find(user => user.username === username)

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = {
        id: user_Id++,
        username,
        password
    }

    USERS.push(newUser)

    res.status(201).json({ message: 'User created successfully' })
});

app.post('/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const userAlreadyExists = USERS.find(user => user.username === username && user.password === password)

    if (!userAlreadyExists) {
        return res.status(400).json({ message: 'Invalid username or password' })
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
app.post('/Organization', authMiddleware, (req, res) => {
    const userId = req.userId;
    // Id, Tittle, Description, admin, members
    ORGANIZATIONS.push({
        OrganizationId: organization_Id++,
        Title: req.body.Title,
        Description: req.body.Description,
        admin: userId, //The member who created the organization will be the admin of the organization
        members: []
    })

    res.json({
        message: 'Organization created successfully',
        id: organization_Id - 1 
    })
})

app.post('/add-member-to-organization', authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserName = req.body.memberUserName;

    // Check if the organization exists
    const organization = ORGANIZATIONS.find(org => org.OrganizationId === organizationId);

    if (!organization) {
    return res.status(404).json({
        message: "Organization not found"
    });
}

if (organization.admin !== userId) {
    return res.status(403).json({
        message: "Only the organization admin can add members"
    });
}

    // Check if the member exists
    const memberUserUserName = USERS.find(user => user.username === memberUserName);

    if (!memberUserUserName) {
        return res.status(404).json({ message: 'Member not found' });
    }

    // Add the member to the organization
    organization.members.push(memberUserUserName.id);

    res.json({
        message: 'Member added to organization successfully',
    })
})


app.post('/Board', authMiddleware, (req, res) => {
    const userId = req.userId;
    //id , tittle, organizationId
    const OrganizationId = req.body.organizationId;
    const title = req.body.Title;

    const organization = ORGANIZATIONS.find(org => org.OrganizationId === OrganizationId);

    if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
    }

    if (organization.admin !== userId) {
        return res.status(403).json({ message: 'Access denied' });
    }

    BOARDS.push({
        BoardId: board_Id++,
        Title: title,
        organizationId: OrganizationId
    })

    res.json({
        message: 'Board created successfully',
        id: board_Id - 1 
    })
})

app.post('/Issue', authMiddleware, (req, res) => {
    const userId = req.userId;
    const boardId = req.body.boardId;
    const title = req.body.Title;
    const state = req.body.state; //NEXT, IN_PROGRESS, DONE

    const board = BOARDS.find(board => board.BoardId === boardId);

    if (!board) {
        return res.status(404).json({ message: 'Board not found' });
    }

    // id, tittle, boardId, state(NEXT, IN_PrOGRESS, DONE)
    ISSUES.push({
        IssueId: issue_Id++,
        Title: title,
        boardId: boardId,
        state: state
    })

    res.json({
        message: 'Issue created successfully',
        id: issue_Id - 1
    })
})


// Get EndPoints

app.get('/Organization', authMiddleware, (req, res) => {
    const userId = req.userId;
    const OrganizationId = parseInt(req.query.organizationId);

    const organization = ORGANIZATIONS.find(org => org.OrganizationId === OrganizationId);

    if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
    }

    if (organization.admin !== userId) {
        return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
        message: 'Organization fetched successfully',
        organization : {
            ...organization,
            members: organization.members.map(memberId => {
                const user = USERS.find(user => user.id === memberId);
                return {
                    id: user.id,
                    username: user.username
                };
            })
                }
        })
    });

app.get('/Boards', authMiddleware, (req, res) => {
    const userId = req.userId;
    const OrganizationId = parseInt(req.query.organizationId);

    const organization = ORGANIZATIONS.find(org => org.OrganizationId === OrganizationId);

    if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
    }

    if (organization.admin !== userId) {
        return res.status(403).json({ message: 'Access denied' });
    }


    res.json({
        message: 'Boards fetched successfully',
        boards: BOARDS
    })
})

app.get('/Issues', authMiddleware, (req, res) => {
    res.json({
        message: 'Issues fetched successfully',
        issues: ISSUES
    })
})


app.listen(3000)
