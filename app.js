require('dotenv').config()
const fun = require('./jwtauthfunc/authtokens.js')
const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const pool = require('./database/database')


app.use(express.json())

let refreshStore =  []



app.get("/",fun.authToken,(req,res)=>{

    //Parse out all i need
    res.json({
        rid:req.user.user.rid
    })
})
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshStore.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,newTokenUser)=>{
        if (err) return res.sendStatus(403) //Watu wajucange
        //parse user object for important info
        const access_token = generateAccessToken({
            rid: newTokenUser.user.rid
        })
        res.json({access_token})
    })
    
})


app.post('/tlogin',(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    let hash = new Buffer(password).toString('base64');
    pool.query('SELECT r_email,r_password,rid FROM tbl_add_rent WHERE r_email=? LIMIT 1',[email], (err,rows) => {
        let user = rows[0]
        if(err) throw err;
        if(hash === user["r_password"]){
            const refreshtoken = generateRefreshToken({user})
            refreshStore.push(refreshtoken)
            res.json({
                access_token : generateAccessToken({user}),
                refresh_token: refreshtoken
            })
        }else{
            res.json(user)
        }
    });
  
})


app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.listen(9000,()=>{
    fun.say()
})