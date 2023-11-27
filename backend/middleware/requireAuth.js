const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req,res,next) =>{

    const {authorization} =  req.headers

    // Exclude specific full URL from authentication
    const excludedRoute = '/api/quotes/get';

    if (req.method === 'GET' && req.originalUrl.startsWith(excludedRoute)) {
        return next();
    }


    if(!authorization){
        return res.status(401).json({error:'Auth token required'})
    }

    const token = authorization.split(' ')[1]

    try {
       const {_id} = jwt.verify(token, process.env.SECRET)
       req.user = await User.findOne({_id}).select('id')
       next()
        
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'request is not authorized'})
    }



}


module.exports = requireAuth