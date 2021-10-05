// using the file system library, importing it with require() function.
const fs = require('fs');


// promise based function
const writeFile = fileContent => {
    //by using the 'new' keyword we are creating a new Promise object
    // 'resolve' & 'reject' are functions used as parameters 
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and send error to the Promise's '.catch()' method
            if (err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well 
                return;
            }

            // if everything went well, resolve the Promise and send the successful data to the '.then()' method
            resolve({
                ok:true,
                message: 'File Created'
            });
        });
    });
};

const copyFile = () => {
    return new Promise ((resolve, reject) => {
        fs.copyFile('./dist/index.html', fileContent, err => {
            fs.copyFile('./src/style.css', './dist/style.css', err => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Style sheet copied successfully!');
            });


            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok:true,
                message:'File copied!'
            });
        });
    });
};



//exporting and object with two functions to the app.js file
// "shorthand property names" 
module.exports = {writeFile, copyFile};