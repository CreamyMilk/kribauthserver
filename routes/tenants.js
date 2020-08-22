const router = require("express").Router()

router.get('/',(req,res)=>{
    res.json({me:"ok"})
})

module.exports = router