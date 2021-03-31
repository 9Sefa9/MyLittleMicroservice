//our authentication routes
const router = require('express').Router();
//access to the User 
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('./validation');



//Register -  //Validating data with happijoi before shipping it to DB.
router.post('/register', async (req,res)=>{
   
 
    
    //if the register credential is not met:
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //if the email credential is not met:
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('E-Mail already exists!');

    //Hashing the password: 

    //Generating salt
    const salt = await bcrypt.genSalt(10);

    //hashing:
    const hashedPassword = await bcrypt.hash(req.body.password,salt);


    //if the credentials are met: 
    //(using the model:)
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });

    try{
        //saving to DB
        const savedUser = await user.save();
        //but showing only the user id. not the added credentials
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err)
    }
    
});

// Login:
router.post('/login',async (req,res)=>{
    const {error} = loginValidation(req.body);
    //if login is present:
    if(error) return res.status(400).send(error.details[0].message);

     //if the email exists:
     const user = await User.findOne({email:req.body.email});
     if(!user) return res.status(400).send('E-Mail was not found!');
 
     //password is correct:
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password!');

    //creating and assigning a token ( can include any data )
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

    //res.send('You succesfully logged in!');

});

module.exports = router;