const express = require('express')
const {createUser,userLogin} = require('../controllers/UserController')

const router = express.Router()



router.post("/login",userLogin)


router.post("/register", createUser)



module.exports=router