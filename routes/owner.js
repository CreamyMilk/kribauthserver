const fun = require("../jwtauthfunc/authtokens")
const router = require("express").Router()
const pool = require("../database/database")

router.get('/units',fun.authToken,(req,res)=>{
    let units = {}
    res.json(units)
})



module.exports = router