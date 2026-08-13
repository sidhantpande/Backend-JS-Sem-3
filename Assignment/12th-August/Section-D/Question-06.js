import {error, log} from 'console'
import fs, {readFileSync} from 'fs'

console.log("1. Start")

fs.writeFileSync("welcome.txt", "2: The file content is reached")

fs.readFile("welcome.txt", (error,data) =>{
    if(error){
        console.lohg("Error reading the file. Make sure the file exists! ");
        return;
    }
    console.log("-- File Content ---");
    console.log(data.toString());
})

console.log("3: End")