import express from "express"
const app = express()
import mongoose from "mongoose"
import { fileURLToPath } from "url";
import path from "path"
import expressLayouts from "express-ejs-layouts"
import session from "express-session"
import flash from "connect-flash"
import dotenv from "dotenv"
import frontendRouter from './routes/Frontend.js';
import adminRouter from './routes/admin.js';
const router = express.Router();

dotenv.config()





app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//View Engine 
app.set("view engine", "ejs")
const PORT  = process.env.PORT 

//Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log("Database connection error: ", err)
})


//frontend route 


app.use('/', frontendRouter)

//admin route
app.use('/admin', (req, res, next) => {
         res.locals.layout = 'admin/layout';
         next();
})
app.use('/admin', adminRouter)



app.listen(PORT, ()=>{
    console.log(`app is runing on port http://localhost:${PORT}`)
})