# MERN Full Stack Application Scaffolding

## Features include:
* Webpack development server for hot reloading
* Concurrent backend API server running on nodemon for live server updates
* Mongoose with Promises
* Prebuilt MVC folder structure
* Bootstrap grid components
* structured with Heroku deployment in mind.


### To use, open your command line interface/bash to the desired folder and type

`git clone https://github.com/m081779/mern-scaffolding.git`

### Next, run

`yarn install && cd client && yarn install`

### This will install the necessary dependencies in your root and client directories.

### Edit the `localDB` constant in `./config/database.js` to whatever local Mongo database you will use.  It is prebuilt for deployment to Heroku by using environmental variables for mLab.

### A basic Mongoose user schema is provided, along with a user controller with basic CRUD functionality, and corresponding API routes.  These can be edited or deleted as your applications needs determine.

### The scaffolding will load by default a basic CRUD application where usernames and passwords can be added to the database, viewed, updated, and finally deleted.
