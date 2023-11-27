require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserRoutes= require('./routes/UserRoutes')
const QuoteRoutes= require('./routes/QuoteRoutes.js')

const app = express()
app.use(express.json())
app.use(cors())


app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})



app.use("/api/users", UserRoutes)
app.use("/api/quotes", QuoteRoutes)



mongoose.connect(process.env.MONG_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 