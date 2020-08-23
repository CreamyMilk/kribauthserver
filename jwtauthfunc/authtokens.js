const jwt = require("jsonwebtoken")


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

function authToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)//Huaja login in bado
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,auser)=>{
        if (err) return res.sendStatus(403) //Niaje janjes ume change kitu
        req.user = auser
        next()
    })
  }

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}
function say(){
    console.log("Listening on port 9000")
}



module.exports = {
      authToken,
      say,
      generateAccessToken,
      generateRefreshToken
  }