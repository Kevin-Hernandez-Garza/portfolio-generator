// creating an arrow function, here we use back-ticks to insert variables inside the function block 
const generatePage = (name, github) => {
    return ` 
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Portfolio Demo</title>
    </head>

    <body>
        <h1>${name}</h1>

        <h2> <a href="https://github.com/${github}">Github</a></h2>
    </body>
    </html>
    `;
};


// using a function from one module inside another, we use the module.exports and require statements
// because we want to make these functions available to other files we use module.exports at the bottom
module.exports = generatePage;