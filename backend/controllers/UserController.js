const userModel = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = (_id) => {
return jwt.sign({ _id}, process.env.SECRET , {expiresIn:'3d'})
}

const createUser = async (req,res) =>{

    const {username,email,password} =req.body;
    try {
        const user = await userModel.register(username,email,password)
        const token = createToken(user._id)
        res.status(200).json({username,token})
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
    
}

const userLogin = async (req,res)=>{
    
    const {username,password} = req.body;
    
    try {
        const user = await userModel.login(username,password)
        const token = createToken(user._id)
        res.status(200).json({username,token})
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
} 


module.exports={
    createUser,
    userLogin
}