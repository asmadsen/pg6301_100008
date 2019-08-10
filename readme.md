# Exam

All of the requirements 1 through 8 is completed.

## Usage
_All commands listed expect you are running them from the same directory as package.json_

- Download dependencies:
        
  `yarn`

- Run tests:

  `yarn test`
  
  _This will generate a coverage directory in the root_

- Build:
 
  `mvn clean verify`
  
  _Note this **only** builds the frontend_

- Run the project:

    - Development mode:
    
      `yarn dev`
      
    - Production mode
    
      `yarn start`
      
      _assumes you have run `yarn build` first_

## Notes

### Project structure

In addition to the generation of the `public` directory on build(as discussed below), I have created a folder called `bin`, which contains two scrips, one called `devServer.js` which configures webpack and webpack-dev-server and runs the express instance, and one called `server.js` which just starts the express instance.

The reason for this is that those do not belong inside the `src` folder, just like other config files like `babel.config.js`, `jest.config.js` and `webpack.config.js`.

### Changes to package.json > scripts

Since I use webpack-dev-middleware when running in development mode, I don't have to run Webpack in watch-mode alongside the express instance. So therefore I have removed both `watch:client` and `watch:server` from the scripts section.

### Webpack

I have no `public` directory in the root, since I process everything with Webpack.
This way I could enable the addition of a content-hash in the filenames, and this will automatically be injected into a index.html and moved to the `public` directory when running `yarn build`. This would allow me to deploy the service using a very long Cache-Control: max-age header since the file urls would change if the contents change.
I have also enabled code-splitting so every route, is split into it's own js file, as well as the third-party scripts is split into it's own file. This means that if I where to change the contents of only one route only that file would be changed, as well as it only being downloaded by the browser when the user navigates to the page. 
Since webpack is run from the express instance when in development, it also allowed me to enable hot-module-reloading. However React does not support this feature 100% so the only benefit from it now is the fact that it automatically refreshes the browser.

### Babel

To be able to utilize the new EcmaScript features on the server just like client, I run the server code through babel as well. This is done using babel-node, in a real project you would usually transpile the backend as well as I assume babel-node has some overhead when running in production.

### The utilization of typings

__In the requirements it says clearly not to write anything that transpiles to javascript (ie. TypeScript, CoffeeScript, Flow and Kotlin).__ 

This project is not using Typescript, however it has dependencies on some typings of packages for the IDE to give better code completion.


## Extras

- Filtering can filter based on multiple genres
- Sorting can be changed
- Used React Hooks
- Used eslint
- Used RxJS
  - On the server used as a message bus
  - On the client used to communicate with the backend using websockets
- Created a dependency injection container to more easily keep track of dependencies on the backend
- Uses webpack-dev-middleware to serve the frontend from the express instance during development
