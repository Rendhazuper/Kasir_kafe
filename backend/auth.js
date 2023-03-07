const jwt = require("jsonwebtoken")
const SECRET_KEY = "wikusama"
auth = (req, res, next)=> {
    let header = req.header.authorization
    let token = header && header.split (" ")[1]

    let jwtheader = { 
        algorithm : "HS256"
    }
    if (token == null){
        res.status(401).json({message : "tidak terautorisasi"});

    }else{
        jwt.verify(token, SECRET_KEY, jwtheader, (error,user) => { 
            if (error){
                res
                .status(401)
                .json({
                    message : "invalid token"
                })
            }else{
                console.log(user);
                next()
            }
        })
    }

}

module.exports = auth;