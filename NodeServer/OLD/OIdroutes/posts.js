//our authentication routes
const router = require('express').Router();
const verify = require('./verifyToken');


//verify here is the middleware. 
router.get('/',verify,(req,res)=>{
   res.send(req.user);
});

module.exports = router;