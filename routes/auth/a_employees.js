const router = require("express").Router()
const pool = require("../../database/database")

router.get('/',(req,res)=>{
    res.json({Jo:"Hwllo"})
})

module.exports = router