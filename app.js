require('dotenv').config()

const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const pool = require('./database/database')

app.use(express.json())

let refreshStore =  []

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    //jwt.verifyrows
})

app.post('/tlogin',(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    let hash = new Buffer(password).toString('base64');
    pool.query('SELECT r_email,r_password FROM tbl_add_rent WHERE r_email=? LIMIT 1',[email], (err,rows) => {
        if(err) throw err;
        let user = rows[0]
        if(hash === user["r_password"]){
            const refreshtoken = generateRefreshToken({user})
            res.json({
                access_token : generateAccessToken({user}),
                refresh_token: refreshtoken
            })
        }else{
            res.json(user)
        }
    });
  
})
app.post('/ologin',(req,res)=>{
    pool.query('SELECT r_email,r_password FROM tbl_add_rent WHERE r_email=? LIMIT 1',[req.body.email], (err,rows) => {
        if(err) throw err;
            console.log('Data received from tbl_add_rent');
            res.json(rows)
    });
  
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.listen(9000,()=>{
    console.log("Listening on port 9000")
})