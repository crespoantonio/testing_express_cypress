const router = require('express').Router();
const User = require('../model/users');
const {DataValidation} = require('../dataValidation');
const bcrypr = require('bcryptjs');
const jwt = require('jsonwebtoken');

//app.use('/api/register')
router.post('/register', async (req, res)=>{
    //Validate that the body is content matches our requirements.
    const {error} = DataValidation.registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    //check to make sure that user doesn't exist
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('Email already registered')

    //Encrypt password
    const encryptedPassword = await bcrypr.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
})

//login
router.post('/login', async (req, res)=>{
    //Validate that the body is content matches our requirements.
    const {error} = DataValidation.loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if email exists
    const userInDB = await User.findOne({email: req.body.email});
    if(!userInDB) return res.status(400).send('Email not registered');

    const validPassword = await bcrypr.compare(req.body.password, userInDB.password);
    if(!validPassword) return res.status(401).send('Invalid password');


    const token = jwt.sign({_id: userInDB._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).status(200);
    res.status(200).send('Logged in');
})

module.exports = router;