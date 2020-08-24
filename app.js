require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(morgan('tiny'))
//Middlewares
app.use(express.json())


//Routing
const tenantAuthRoute = require('./routes/auth/a_tenats')
const tenantRoute = require('./routes/tenants')
const employeeAuthRoute = require('./routes/auth/a_employees')

//Handlers
app.use("/api/v1/auth/tenant",tenantAuthRoute)
app.use('/api/v1/auth/employee',employeeAuthRoute)
app.use("/api/v1/tenant",tenantRoute)

app.use((req,res,next)=>{
	res.json({status:"healthy"})
})
app.listen(9000,()=>{
    console.log(" http://localhost:9000")
})