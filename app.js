import express from "express"
const app = express()
import mongoose from "mongoose"
import path from "path"
import expressLayouts from "express-ejs-layouts"
import session from "express-session"
import flash from "connect-flash"
import dotenv from "dotenv"

dotenv.config()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts)
app.set("layout", "layout")


//View Engine 
app.set("view engine", "ejs")


//Database connection
mongoose.connect(process.env.MONGODB_URI)

//frontend route 
app.use('/', require('./routes/Frontend.js'))

//admin route
app.use('/admin', (req, res, next) => {
         res.locals.layout = 'admin/layout';
         next();
})
app.use('/admin', require('./routes/admin.js'))



app.listen(Port, ()=>{
    console.log(`app is runing on port http://localhost:${3000}`)
})