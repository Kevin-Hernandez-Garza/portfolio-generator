// using the file system module
const fs = require('fs');

// we use the require statement to include the generatePage() function 
// we use the require statement to receive the exported functions 
const generatePage = require('./src/page-template.js');

// array, that hold the user command-line arguments 
const profileDataArgs = process.argv.slice(2, process.argv.length);

const [name,github] = profileDataArgs; // assignment destructing

// generating the html file
fs.writeFile('index.html', generatePage(name, github), err => {
    // if there is an error then it will throw an err
    if (err) throw new Error(err);

    console.log('Portfolio complete! Check out index.html to see the output!');
});