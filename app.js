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


// we are wrapping it inside the promptUser function so it's able to be invoked on demand 
// we are calling a function that returns the result of inquirer.prompt which is a promise
const promptUser = () => {
    return inquirer.prompt([
        // array of objects
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },

        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?'
        },

        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself: '
        }
    ]);
};

    // project questions prompts
    const promptProject = portfolioData => {
        console.log(
            `
            =================
            Add a New Project
            =================
            `
        );

        // added the projects array to the portfolioData object and initialized it as an empty array in every function call
        // If there's no 'projects' array property, create one
        if(!portfolioData.projects) {
        portfolioData.projects = [];
        }

        return inquirer.prompt([
            // array of objects
            {
                type:'input',
                name: 'name',
                message: 'What is the name of your project?' 
            },
            {
                type:'input',
                name:'description',
                message:'Provide a description of the project (Required)'
            },
            {
                type:'checkbox',
                name:'languages',
                message:'What did you build this project with? (Check all that apply)',
                choices:['JavaScript','HTML','CSS','ES6','jQuery','Bootstrap','Node']
            },
            {
                type:'input',
                name:'link',
                message:'Enter the GitHub link to your project. (Required)'
            },
            {
                type:'confirm',
                name:'feature',
                message:'Would you like to feature this project?',
                default: false
            },
            {
                type:'confirm',
                name:'confirmAddProject',
                message:'Would you like to enter another project?',
                default: false
            }

        ])
        // adding another project, if confirmAddProject is true
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
    };

    // the promise will resolve with a .then() method
    // we append the .then() to the function call here
    // in order to see the questions we need to call the promptProject() function
    // using promises we chain the functions together using the .then() method
    // promptUser()
    // .then(answers => console.log(answers))
    // .then(promptProject)
    // .then(projectAnswers => console.log(projectAnswers));

    promptUser()
        .then(promptProject)
        .then(portfolioData => {
            console.log(portfolioData);
        });