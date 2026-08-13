import {log} from 'console'
import fs, {readFileSync} from 'fs'

console.log("The Notes Manager Started");

fs.mkdirSync("data");
console.log("Data folder created");

fs.writeFileSync("data/notes.txt", "Note 1: Backend in fun");
console.log("File created and the content added");

fs.appendFileSync("data/notes.txt", "Note 2: fs module learned");
fs.appendFileSync("data/notes.txt", "Note 3: CRUD done");
console.log("Appending the things has been done");

let data = fs.readFileSync("data/notes.txt");
console.log(data.toString())

fs.rmSync("data", {recursive: true, force: true});
console.log("File deleted successfully")
