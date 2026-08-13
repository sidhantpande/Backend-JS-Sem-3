import {log} from 'console'
import fs, {readFileSync} from 'fs'

fs.writeFileSync("demo.txt", "AAAA")
console.log("File Created")

fs.writeFileSync("demo.txt","BBB")
console.log("File updated")

fs.appendFileSync("demo.txt", "CCC")
console.log("Appended Successfully")

let data = fs.readFileSync("demo.txt");
console.log(data.toString());