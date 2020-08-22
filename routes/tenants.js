const fun = require("../jwtauthfunc/authtokens")
const router = require("express").Router()
const pool = require("../database/database")

router.get('/notice',fun.authToken,(req,res)=>{
    let branch_id = req.user.user.branch_id 
    pool.query("SELECT * FROM tbl_notice_board WHERE branch_id=?",[branch_id],(err,rows)=>{
        if(err) throw err;
        console.log()
        res.json(rows)
    })
})

router.get('/complains',fun.authToken,(req,res)=>{
    let branch_id = req.user.user.branch_id 
    let user_id  = req.user.user.rid 
    pool.query("SELECT *,m.month_name from tbl_add_complain c inner join tbl_add_month_setup m on m.m_id = c.c_month where c.branch_id =? and c.c_userid =? order by complain_id DESC LIMIT 5",[branch_id,user_id],(err,rows)=>{
        if(err) throw err;
        console.log()
        res.json(rows)
    })
})
router.get('/all',fun.authToken,(req,res)=>{
    let branch_id = req.user.user.branch_id 
    let user_id  = req.user.user.rid 
    pool.query("",(err,rows)=>{
        if(err) throw err;
        console.log()
        res.json(rows)
    })
})

module.exports = router