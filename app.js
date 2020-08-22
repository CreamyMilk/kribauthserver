require('dotenv').config()
const express = require("express")
const app = express()


//Middlewares
app.use(express.json())


//Routing
const tenantAuthRoute = require('./routes/auth/a_tenats')
const tenantRoute = require('./routes/tenants')


//Handlers
app.use("/api/v1/auth/tenant",tenantAuthRoute)
app.use("/api/v1/tenant",tenantRoute)

app.use((req,res,next)=>{
	res.json({status:"healthy"})
})
app.listen(9000,()=>{
    console.log(" http://localhost:9000")
})