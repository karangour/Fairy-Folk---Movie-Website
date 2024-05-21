const fs = require("fs");
const path = require("path");

// Define the path to the JSON file where we will store the passwords
const filePath = path.join(__dirname, "passwords.json"); //path.join() from the path module joins the entire file path from left to right to make one straight file path
// console.log(filePath)


function getPasswords() {
  const data = fs.readFileSync(filePath, "utf-8"); // 'readFileSync' is an fs method for reading a file. The utf-8 is for reading it in human-readable format
  return JSON.parse(data); // parse is to convert a JSON string into JSON object so it can be manipulated in our code. It always needs to be stored back as a string because that's how JSON is stored (using JSON.stringify())
}

// Function to update the passwords and save them to the file
function setPassword(newPasswordsArray) {
  console.log("Updating passwords data:", newPasswordsArray[0].expired);
  fs.writeFileSync(filePath, JSON.stringify(newPasswordsArray), "utf-8"); // 'utf-8' isn't necessary but it's good to add so that we're sure that the file is written in unicode that includes a wide array of characters from various languages. Node.js may default to utf-8 but this is to make sure.
}

module.exports = {
  getPasswords,
  setPassword,
};
