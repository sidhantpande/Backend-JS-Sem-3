import fs from 'fs/promises'
async function ManageFiles() {
    try{
    //Question-1
    await fs.writeFile("Welcome.txt", "Welcome to Backend Development");
    console.log("File Created Successfully");

    //Question-2
    let data = await fs.readFile("Welcome.txt");
    console.log(data.toString());
} catch (error){
    console.error("An error occurred: ", error);
}
}
ManageFiles();