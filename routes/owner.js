const fun = require("../jwtauthfunc/authtokens")
const router = require("express").Router()
const pool = require("../database/database")

router.get('/units',fun.authToken,(req,res)=>{
    let units= {}
    const user_id = req.user.user.ownid
    //console.log(req.user.user)
    pool.query("SELECT * FROM tbl_add_owner_unit_relation",(err,rows)=>{
        if(err) throw err;
        units['relations'] = rows
        pool.query("SELECT count(r.rid) as total_rent FROM tbl_add_owner_unit_relation ur INNER JOIN tbl_add_rent r on r.r_unit_no = ur.unit_id where ur.owner_id ='?'",[user_id],(err,rows)=>{
            units["rented"] = rows[0]
            pool.query("SELECT sum(f.rent) as total FROM tbl_add_fair f inner join tbl_add_owner_unit_relation ur on ur.unit_id = f.unit_no where ur.owner_id ='?'",[user_id],(err,rows)=>{
                units["TotalRent"] = rows[0]
                res.json(units)
            })
            
        })   
    })
    //res.json(units)
})
router.get('/tenants',(req,res)=>{
    const user_id = req.user.user.ownid
    
})

router.get('/employees',(req,res)=>{
    const user_id = req.user.user.ownid
    
})

router.get('/rent',(req,res)=>{
    const user_id = req.user.user.ownid
    
})

router.get('/costs',(req,res)=>{
    const user_id = req.user.user.ownid
    
})

router.get('/',(req,res)=>{
    pool.query('SELECT *,ar.image as r_image,ar.r_name,fl.floor_no as fl_floor,u.unit_no as u_unit,m.month_name from tbl_add_fair f inner join tbl_add_floor fl on fl.fid = f.floor_no inner join tbl_add_unit u on u.uid = f.unit_no inner join tbl_add_month_setup m on m.m_id = f.month_id inner join tbl_add_rent ar on ar.rid = f.rid where bill_status = "0" and f.branch_id = "8" order by f.f_id desc',(err,rows)=>{
        res.json(rows)
    })

})

module.exports = router