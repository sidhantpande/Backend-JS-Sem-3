import { log } from 'console'
import fs, { readFileSync } from 'fs'
fs.writeFileSync("index.html","Hiiiiii")
let data = fs.readFileSync("index.html")
console.log(data.toString(), "hehehehheheheheheh")
fs.writeFile("home.txt","hello",()=>{
    console.log("maiiii");
})
console.log("2");
console.log("3");
let data1 = fs.readFileSync("home.txt")
console.log(data1.toString(),"HELO HELO HELO")
fs.mkdirSync("folder")
fs.writeFileSync("folder/new.txt","hiiiiiiiiiiiiii")
let data2 = readFileSync("folder/new.txt")
console.log(data2.toString(), "Doneeeee")
