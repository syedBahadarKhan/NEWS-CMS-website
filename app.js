import express from "express"
const app = express()
const Port = 3000;


app.get('/', (req, res) =>{
    res.send("this is the home Route")
})



app.listen(Port, ()=>{
    console.log(`app is runing on port http://localhost:${3000}`)
})