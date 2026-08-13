import {log} from 'console'
import fs, {appendFile, readFile, readFileSync } from 'fs'

//Question-03
fs.writeFileSync("task.txt", "Task 1: Learn Node");
console.log("File Created");

fs.appendFileSync("task.txt", "\nTask 2: Learn fs Module");
console.log("Line Appended");

let data = fs.readFileSync("task.txt");
console.log(data.toString());