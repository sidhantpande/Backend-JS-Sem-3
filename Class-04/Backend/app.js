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

app.listen(4000, () => {
    console.log("server Started");
})
