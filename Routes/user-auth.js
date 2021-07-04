const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

const User = require('../Schemas/users.js');
const {registerValidation,loginValidation} = require('../validation.js');

router.post('/auth/signup',async(req,res)=>{
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const infoExist = await User.findOne({mail: req.body.mail});
    if(infoExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.pwd, salt);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        country: req.body.country,
        residence: req.body.residence,
        mail: req.body.mail,
        pwd: hashedPassword,
        repeat_pwd: hashedPassword
    });
    try{
        const savedUser =await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }

})

router.post('/auth/login',async(req,res)=>{

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const userLogin =  await User.findOne({ mail: req.body.mail });
    if(!userLogin) return res.status(400).send('mail is not found');

    const token = jwt.sign({_id: userLogin._id}, process.env.TOKEN_SECRET);
    res.header('user-token, token').send(token);
    console.log(userLogin._id);
})

module.exports = router;