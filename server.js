const express = require('express')
const app = express()
const   PORT = process.env.PORT || 3000
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')



app.use(express.static('public'))

app.use(expressLayout)
app.set('views' , path.join(__dirname,'/resources/views'))
app.set('view engine' ,'ejs')

require('./routes/web')(app)



app.listen(PORT,(req,res)=>{
     console.log("connected")
})