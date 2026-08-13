let express = require('express')
let app = express()
app.use((req,res,next)=>{
    console.log("Mai huu kon mera naam tho bata");
    next()
})
app.get('/',(req,res)=>{
    res.send("Hello Server")
})
app.listen('3000',()=>{
    console.log("Server Started")
})