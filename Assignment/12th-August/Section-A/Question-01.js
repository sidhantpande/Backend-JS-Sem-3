import {log} from 'console'
import fs, {readFileSync} from 'fs'

// Question-01 
fs.writeFile("welcome.txt","Welcome to Backend Development",()=>{
    console.log("File created Successfully");
})

//Question-02
let data = fs.readFileSync("welcome.txt");
console.log(data.toString());