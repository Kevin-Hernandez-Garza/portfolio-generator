const inquirer = require('inquirer');
// // importing the file system module
// const fs = require('fs');

// // we use the require statement to include the generatePage() function 
// // we use the require statement to receive the exported functions 
// const generatePage = require('./src/page-template.js');

// // array, that holds the user command-line arguments 
// // all command line arguments are given to the process in an array called argv (argument values)
// // const profileDataArgs = process.argv.slice(2, process.argv.length);

// // const [name,github] = profileDataArgs; // assignment destructing

// const pageHTML = generatePage(name, github);

// // generating the html file
// fs.writeFile('./index.html', pageHTML, err => {
//     // if there is an error then it will throw an err
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });

inquirer 
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then(answers => console.log(answers));