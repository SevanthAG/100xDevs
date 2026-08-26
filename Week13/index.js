const express = require('express')
const { Pool } = require('pg')
require('dotenv').config()
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const app = express;
app.use(express.json())



app.post('/signup',async (req, res)=> {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const result = await pool.query(
        `INSERT INTO users(username, email, password)
        VALUES($1, $2, $3)
        RETURNING id`,[username, email, password]
    )

    return res.json({
        message: "Signup successfull",
        id: result.rows[0]
    })

})


app.post('/signin',async (req, res)=> {
    const username = req.body.username
    const password = req.body.password

    const result = await pool.query(
        `SELECT * FROM users 
        WHERE email = '$1' AND password='$2'`
    )
    const isExist = result.rows[0]

    if(!isExist){
        res.status(404).json({
            message: "Invalid Credential"
        })
        return
    }

    return res.json({
        message: "Login Successfull",
    })
})

app.listen(3000)