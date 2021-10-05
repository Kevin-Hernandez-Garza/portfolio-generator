// importing the inquirer package 
const inquirer = require('inquirer');

// importing the file system module
// const fs = require('fs');

//importing functions using object destructuring
const {writeFile, copyFile} = require('./utils/generate-file.js');

// we use the require statement to receive the exported functions, include the generatePage() function
// this expression assigns the HTML template function in page-template.js to the variable generatePage
const generatePage = require('./src/page-template');

// we are wrapping it inside the promptUser function so it's able to be invoked on demand 
// we are calling a function that returns the result of inquirer.prompt which is a promise
const promptUser = () => {
    return inquirer.prompt([
        // array of objects
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },

        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?',
            validate: userName => {
                if (userName) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },

        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },

        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        },
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
                message: 'What is the name of your project?', 
                validate: projectName => {
                    if (projectName) {
                        return true;
                    } else {
                        console.log('Enter the project name!');
                        return false;
                    }
                }
            },
            {
                type:'input',
                name:'description',
                message:'Provide a description of the project (Required)',
                validate: projectDes => {
                    if (projectDes) {
                        return true;
                    } else {
                        console.log('Enter a valid description for your project!');
                        return false;
                    }
                }
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
                message:'Enter the GitHub link to your project. (Required)',
                validate: projectLink => {
                    if (projectLink) {
                        return true;
                    } else {
                        console.log('Enter a valid link to your project!');
                        return false;
                    }
                }
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


        promptUser()
        // this is a promise chain, it allows you to attach multiple .then() methods to one another
        .then(promptProject)
        .then(portfolioData => {
             return generatePage(portfolioData);
            })
            .then(pageHTML => {
                return writeFile(pageHTML);
            })
            .then(writeFileResponse => {
                console.log(writeFileResponse);
                return copyFile();
            })
            .then(copyFileResponse => {
                console.log(copyFileResponse);
            })
            .catch(err => {
                console.log(err);
            }); 
        
            // const pageHTML = generatePage(portfolioData);

            // // generating the html file, has 3 parameters
            // fs.writeFile('./dist/index.html', pageHTML, err => {
            //     // if there is an error then it will throw an err
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     console.log('Page created! Check out index.html in this directory to see it!');

            //     fs.copyFile('./src/style.css', './dist/style.css', err => {
            //         if (err) {
            //             console.log(err);
            //             return;
            //         }
            //         console.log('Style sheet copied successfully!');
            //     });
            // });
        