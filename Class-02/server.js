let http = require('http')
let server = http.createServer((req,res)=>{
    if(req.url=='/'){
        res.end("helloo")
    }else if(req.url=='/about'){
        res.end("about")
    }
})
server.listen(3000,()=>{
    console.log("server Running..............");
})
