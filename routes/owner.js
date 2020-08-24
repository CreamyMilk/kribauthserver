const fun = require("../jwtauthfunc/authtokens")
const router = require("express").Router()
const pool = require("../database/database")

router.get('/units',fun.authToken,(req,res)=>{
    pool.query("SELECT * FROM tbl_add_owner_unit_relation",(err,rows)=>{
        if(err) throw err;
        res.json(rows)
    })

    //res.json(units)
})



module.exports = router