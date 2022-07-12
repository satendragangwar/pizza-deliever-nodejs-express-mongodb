require('dotenv').config()
const express = require('express')
const app = express()
const   PORT = 80
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const menu = require('./app/models/menu')
const session = require('express-session')
const { MongoTailableCursorError } = require('mongodb')
const flash = require('express-flash')
// const MongoDbStore = require('connect-mongodb-session')(session)
const MongoDbStore = require('connect-mongo')(session)



const url  = process.env.CONNECTION_URL

mongoose.connect(url );

// menu.create([{
     
//      "name": "Margherita",
//      "image": "pizza.png",
//      "price": "250",
//      "size": "small"
//    },{
     
//      "name": "Marinara",
//      "image": "pizza.png",
//      "price": "300",
//      "size": "medium"
//    },{
    
//      "name": "Carbonara",
//      "image": "pizza.png",
//      "price": "200",
//      "size": "small"
//    },{
     
//      "name": "Americana",
//      "image": "pizza.png",
//      "price": "500",
//      "size": "large"
//    },{
     
//      "name": "Chicken Mushroom",
//      "image": "pizza.png",
//      "price": "350",
//      "size": "medium"
//    },{
    
//      "name": "Paneer pizza",
//      "image": "pizza.png",
//      "price": "200",
//      "size": "small"
//    },{
     
//      "name": "Vegies pizza",
//      "image": "pizza.png",
//      "price": "600",
//      "size": "large"
//    },{
     
//      "name": "Pepperoni",
//      "image": "pizza.png",
//      "price": "500",
//      "size": "medium"
//    }])

const connection = mongoose.connection;
connection.once('open' ,() =>{
     console.log('database.connected....');
}).on('error', (err)=>{
     console.log('connection failed.....')
})


// session config

let mongoStore = new MongoDbStore({
     mongooseConnection:mongoose.connection,
     collection:'sessions'
})




// session config
app.use(session({
     secret: process.env.COOKIE_SECRET,
     resave:false,
     saveUninitialized:false,
     store:mongoStore,
     cookie:{maxAge:1000 * 60 * 60 *24}    


}))

app.use(flash())

app.use(express.static('public'))
app.use(expressLayout)
app.set('views' , path.join(__dirname,'/resources/views'))
app.set('view engine' ,'ejs')

require('./routes/web')(app)



app.listen(80,(req,res)=>{
     console.log("connected")
})