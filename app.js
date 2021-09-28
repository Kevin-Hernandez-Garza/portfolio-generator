/* 
Displays two elements in a Array
First value: File path to where Node.js is installed 
Second value: File path we just executed
*/

/*
In Node.js the 'process' is a global object represent everything going on with this particular app. Similarly to document or window in the browser  
*/

var commandLineArgs = process.argv;
console.log(commandLineArgs);



const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);


// function that can take an array of command-line arguments
// here we are printing them out one by one 
const printProfileData = profileDataArr => {
    // This...
    for (let i = 0; i < profileDataArr.length; i+= 1) {
        console.log(profileDataArr[i]);
    }


    console.log('================');

    // Is the same as this...
    profileDataArr.forEach((profileItem) => console.log(profileItem));
};

printProfileData(profileDataArgs);