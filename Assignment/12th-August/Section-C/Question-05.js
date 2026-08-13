import {log} from 'console'
import fs, {readFileSync} from 'fs'

fs.mkdirSync("myProject");
console.log("Folder Created");

fs.writeFileSync("myProject/info.txt","This is inside a folder");
console.log("Created file and added the content");

let data = readFileSync("myProject/info.txt");
console.log(data.toString())
