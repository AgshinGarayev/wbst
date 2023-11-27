const mongoose= require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique: true
    },
    
    email:{
        type: String,
        required:true
    },
    
    password:{
        type: String,
        required: true
    }
})


userSchema.statics.register = async function (username,email,password){
    const exists = await this.findOne({username})
    if(exists){
        throw Error('Username already in use')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({username, email, password: hash})
    
    return user
}



userSchema.statics.login = async function(username,password) {
    
    if(!username || !password){
        throw Error('All fields must be filled')
    }
    
    const user = await this.findOne({username})
    
    if (!user){
        throw Error('incorrect email')
    }
    
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Invalid login credantials')
    }
    return user
}



const userModel = mongoose.model('user', userSchema)
module.exports = userModel;


