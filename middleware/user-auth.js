const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('user-token');
    if(!token) {
        res.status(401).json({ 
            message : "Access denied"
        })
    }
    try{
        if(token){
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        return next()
        }
    }
    catch(err){
        res.status(401).json({
            message : "Invalid token"
        })
        console.log(err)
    }
    
}


