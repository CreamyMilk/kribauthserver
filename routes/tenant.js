const fun = require("../jwtauthfunc/authtokens")
const router = require("express").Router()
const pool = require("../database/database")

router.get('/rent',fun.authToken,(req,res)=>{
    const user_id = req.user.user.rid
    let stats ={}
    pool.query("SELECT sum(rent) as RentDue FROM tbl_add_fair WHERE rid=? AND paid_date =''",[user_id],(err,rows)=>{
        if(err) throw err;
        stats['total'] = rows[0]
        pool.query("SELECT * FROM tbl_add_fair WHERE rid=? AND paid_date=''",[user_id],(err,rows)=>{
            if(err) throw err;
            stats['info'] = rows
            res.json(stats)
        })
    })
    //Need Amount of rent due , days remaining
    //pool.query("SELECT ")
})
router.get('/payments',fun.authToken,(req,res)=>{
    const user_id = req.user.user.rid
    pool.query("SELECT * FROM tbl_add_fair WHERE rid=? AND paid_date !=''",[user_id],(err,rows)=>{
        if (err) throw err;
        res.json(rows)
    })
})
router.get('/complains',fun.authToken,(req,res)=>{
    let branch_id = req.user.user.branch_id 
    let user_id  = req.user.user.rid 
    //Reason for last five complains
    pool.query("SELECT *,m.month_name from tbl_add_complain c inner join tbl_add_month_setup m on m.m_id = c.c_month where c.branch_id =? and c.c_userid =? order by complain_id DESC LIMIT 5",[branch_id,user_id],(err,rows)=>{
        if(err) throw err;
        res.json(rows)
    })
})
router.get('/details',fun.authToken,(req,res)=>{
    const user_id = req.user.user.rid
    pool.query("SELECT * FROM tbl_add_rent WHERE rid=?",[user_id],(err,rows)=>{
        res.json(rows)
    })
})
router.get('/notice',fun.authToken,(req,res)=>{
    let branch_id = req.user.user.branch_id 
    pool.query("SELECT * FROM tbl_notice_board WHERE branch_id=?",[branch_id],(err,rows)=>{
        if(err) throw err;
        console.log()
        res.json(rows)
    })
})
router.post('/allcomplains',(req,res)=>{
    let branch_id = req.body.branch_id || 8
    let user_id  = req.body.rid || 20
    let numberofcomplains = req.body.number || 1
    pool.query("SELECT *,m.month_name from tbl_add_complain c inner join tbl_add_month_setup m on m.m_id = c.c_month where c.branch_id =? and c.c_userid =? order by complain_id DESC LIMIT ?",[branch_id,user_id,numberofcomplains],(err,rows)=>{
        if(err) throw err;
        res.json(rows)
    })
})
router.get("/building",fun.authToken,(req,res)=>{
    let branch_id = req.user.user.branch_id 
    pool.query("SELECT * FROM tblbranch WHERE branch_id=? LIMIT 2",[branch_id],(err,rows)=>{
        if(err) throw err;
        res.json(rows)
    })
})



module.exports = router