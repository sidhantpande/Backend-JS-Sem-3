let express= require("express")
let mongoose=   require('mongoose')
let bcryptjs=  require('bcryptjs')
  let cors=require('cors')
let app=  express()
let User=  require('./db/db.js')
let jwt=  require('jsonwebtoken')
let dotenv= require('dotenv')
dotenv.config()
let forgotRouter= require('./forget.js')
let resetRouter= require('./reset.js')
app.use(express.json())
app.use(cors())
app.use('/api', forgotRouter)
app.use('/api', resetRouter)


mongoose.connect("mongodb://127.0.0.1:27017/db").then(()=>{
   console.log("db......");
   
})

app.post("/signUp", async(req,res)=>{
   let {name,email,passWord ,role}=req.body
   if(!name || !email || !passWord){
      return res.status(400).json({error:"Name, email and password are required"})
   }
  let findData=   await User.findOne({email})
  if(findData){
   return res.status(409).json({error:"An account with this email already exists"})
  }else{
     let updateddP=   await bcryptjs.hash(passWord,10)

     console.log(updateddP,"dekhoooooo");
     
 let UserInfo=  new User({
      name,email,
      passWord:updateddP,
      role:'user'
   

   })
      await UserInfo.save()
      res.status(201).json({msg:"Account created"})
  }
})



app.post('/login', async(req,res)=>{
   let {email,passWord}=req.body

 let findData=   await User.findOne({email})    
 if(!findData){
    return res.status(401).json({error:"Invalid email or password"})
 }

 let validP= await   bcryptjs.compare(passWord,findData.passWord)
 if(!validP){
    return res.status(401).json({error:"Invalid email or password"})
 }

   let token=    jwt.sign({email:findData.email,role:findData.role},process.env.JWT_SECRET)
  console.log(token,"hehe");

  


 
 res.json({msg:"done",token:token})

})
let auth=(req,res,next)=>{
   let token=req.headers.authorization;
   console.log(token,"toeknn");
   
   if(!token){
      return res.send("kaun hai app...")
   }
   let decode=  jwt.verify(token,process.env.JWT_SECRET)
  console.log(decode,"isse");
  req.user=decode

  next()
}
let roleCheck=(role)=>{
   return (req,res,next)=>{
      if(req.user.role!==role){
         return res.send("who the hell are u...........")
      }
      // console.log(req.user,"isko dekhoooo");
      next()
   }
}




app.get("/api",auth, roleCheck("admin"),(req,res)=>{
   res.send("heheh")

})
app.get('/admin',(req,res)=>{
   res.send("mai hu adminnnnnn")

})
app.listen(3000,()=>{
   console.log("server......");
   
})