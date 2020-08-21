const express = require("express")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const app = express()
const pool = require('./database/database')

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}


app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
})

app.get('/',(req,res)=>{
     pool.query('SELECT r_email,r_password FROM tbl_add_rent', (err,rows) => {
        if(err) throw err;
            console.log('Data received from tbl_add_rent');
            res.json(rows)
    });
})

app.post('/tlogin',(req,res)=>{
    //add json validation 
    //lookup
    pool.query('SELECT r_email,r_password FROM tbl_add_rent WHERE r_email=? LIMIT 1',[req.body.email], (err,rows) => {
        if(err) throw err;
        console.log('Data received from tbl_add_rent');
        res.json(rows)
    });
  
})

app.post('/ologin',(req,res)=>{
    pool.query('SELECT r_email,r_password FROM tbl_add_rent WHERE r_email=? LIMIT 1',[req.body.email], (err,rows) => {
        if(err) throw err;
            console.log('Data received from tbl_add_rent');
            res.json(rows)
    });
  
})
app.post('/logout',(req,res)=>{

})
app.post('/login',(req,res)=>{
    //Lookup user in db 
    pool.query('SELECT r_email,r_password FROM tbl_add_rent WHERE r_email=? LIMIT 1',[req.body.email], (err,rows) => {
        if(err) throw err;
            console.log('Data received from tbl_add_rent');
            res.json(rows)
    });
    //Hash password
    //do validarion
    //Grant token or return error
    //res.json({mesage:"Allowed header is POST"})
})

app.listen(9000,()=>{
    console.log("Listening on port 9000")
})