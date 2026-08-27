let express = require("express")
let mongoose = require("mongoose")
let app = express()
let user = require("./db/db.js")
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/db").then(() => {
    console.log("DataBase Connected");
})

app.post("/signUp", async (req, res) => {
    let { name, email, passWord } = req.body
    let findData = await User.findOne({ email })
    console.log(findData, "hjehehe");

    if (findData) {
        return res.send("user jinda haii....")
    } else {
        let updateddP = await bcryptjs.hash(passWord, 10)
        console.log(updateddP, "dekhoooooo");

        let UserInfo = new User({
            name, email,
            passWord: updateddP

        })
        await UserInfo.save()
        res.send("done.......")
    }


})

app.post('/login',async(req, res)=>{
    let {email, passWord} = req.body

    let findData = await User.findOne({email})
    console.log(findData, "hehehehehe");

    let validP = await bcryptjs.compare(passWord, findData.passWord)
    if(!validP){
        return res.send("Kuch nahi ho payenge");
    }
    res.send("all done....")
})

app.listen(4000, () => {
    console.log("server Started");
})
