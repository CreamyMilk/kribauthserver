require('dotenv').config()
const router = require("express").Router();
const pool = require("../../database/database")
const fun = require("../../jwtauthfunc/authtokens")
const jwt = require("jsonwebtoken")

let refreshStore =  []

router.post('/login',(req,res)=>{
    const email = req.body.email || ""
    const password = req.body.password || "" 
    let hash = new Buffer(password).toString('base64');
    pool.query('SELECT * FROM tbl_add_owner WHERE o_email=?LIMIT 1',[email], (err,rows) => {
        if(rows.length === 0){
            res.json({status:"Wrong email or password"})
        }else{
            let user = rows[0]
            if(hash === user["o_password"]){
                const refreshtoken = fun.generateRefreshToken({user})
                //let userid = user.rid
                refreshStore.push(refreshtoken)
                res.json({
                    access_token : fun.generateAccessToken({user}),
                    refresh_token: refreshtoken
                })
            }else{
                res.json({status:"Wrong email or password"})
            }
        }
    });
})
//refresh token
router.post('/token', (req, res) => {
    const refreshToken = req.body.token 
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshStore.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,newTokenUser)=>{
        if (err) return res.sendStatus(403) //Watu wajucange
        //parse user object for important info
        const access_token = fun.generateAccessToken({
            rid: newTokenUser.user
        })
        res.json({access_token})
    })
    
})

router.delete('/logout', (req, res) => {
    refreshStore = refreshStore.filter(session => session.userid !== req.body.userid)
    res.sendStatus(204)
})

//Not Implemnted YET
router.get('/register',(req,res)=>{
    pool.query('SELECT r_email,r_password FROM tbl_add_rent', (err,rows) => {
        if(err) throw err;
            console.log('Data received from tbl_add_rent');
            res.json(rows)
    });
    //res.json({mesage:"Allowed header is POST"})
})
router.get("/",(req,res)=>{
    res.json(refreshStore)
})
module.exports = router;