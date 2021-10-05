// creating the about section
const generateAbout = aboutText => {
    if (!aboutText) {
      return '';
    }

      return `
        <section class="my-3" id="about">
          <h2 class="text-dark bg-primary p-2 display-inline-block"> About Me </h2>
          <p>${aboutText}</p>
        </section>
      `;
};

/* creating the projects section
 returning a template literal */
const generateProjects = projectsArr => {
  return `
    <section class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
      <div class="flex-row justify-space-between">
      ${projectsArr
        .filter(({ feature }) => feature)
        .map(({ name, description, languages, link }) => {
          return `
          <div class="col-12 mb-2 bg-dark text-light p-3">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
        })
        .join('')}

      ${projectsArr
        .filter(({ feature }) => !feature)
        .map(({ name, description, languages, link }) => {
          return `
          <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
        })
        .join('')}
      </div>
    </section>
  `;
};

module.exports = templateData => {
    /* destructuring statement
    destructure projects, about data, and create an object called header containing the remaining data from templateData based on their property key names */
    const { projects, about, ...header } = templateData; 

    return `
        <!DOCTYPE html>
        <html lang="en">
        <link rel="stylesheet" href="style.css" />
        <body>
        <header>
          <div class="container flex-row justify-space-between align-center py-3">
            <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
            <nav class="flex-row">
              <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${header.github}">GitHub</a>
            </nav>
          </div>
        </header>

        <main class="container my-5">
          <!-- This is getting the generateAbout function and passing the about variable as a parameter if it exist -->
          ${generateAbout(about)}
          <!-- This is getting the generateProjects function and passing the projects variable through it -->
          ${generateProjects(projects)}
        </main>

        <footer class="container text-center py-3">
          <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}<h3>      
        </footer>
      </body>
        </html>
    `;
};

