const jwt = require('jsonwebtoken');


//Middleware function
module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied!');

    try{
    //verified return an id (userId) because we set it in sign function(see auth.js..) as data
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
       next();
    }catch(err){
        res.status(400).send('invalid token !');
    }
}