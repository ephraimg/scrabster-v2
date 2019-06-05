# Scrabster

Author: Ephraim Glick

## Important note on Angular CDK dependency

After installing dependencies, you must add a line to the CDK Drag / Drop source code to avoid a bug. (When dragging a tile from one square on the board to another, a TypeError is thrown due to `_itemPositions` being empty. Root cause has not yet been identified.) The following should be added to `drag-drop.es5.js` at line 2660:

`if (!this._itemPositions.length) { return; }`

## Environment variables

The following variables must be provided in a .env file:

- PORT [e.g. `5000`]
- GOOGLE_CLIENT_ID [for Google Login functionality]
- GOOGLE_CLIENT_SECRET [for Google Login functionality]
- NODE_ENV [`development` or `production`]
- BASE_URL_DEV [e.g. `http://localhost:5000`]
- BASE_URL_PROD
- MONGODB_URI_DEV [e.g. `mongodb://127.0.0.1:27017`]
- MONGODB_URI_PROD
- DB_NAME [e.g. `scrabsterdb`]
- MAILER_ADDRESS [email account for NodeMailer]
- MAILER_PASSWORD [password for that account]

# Running the application

## Database

In terminal, run `mongod` to start the MongoDB daemon. Ensure that you have created a database with the name used for your `DB_NAME` environment variable (e.g. `scrabsterdb`).

To interact with MongoDB from your terminal, use `mongo` command along with the host flag specifying the address corresponding to your `MONGODB_URI` environment variable. E.g.:

`mongo --host 127.0.0.1:27017`.

## Node

Run `yarn start` to start the Node server.

## Tips on deploying to AWS

There are a number of steps required to get this application running on AWS, but most of them are straightforward. I'll assume you're using a Linux server and will deploy by cloning the repo from GitHub. You'll need to use sudo for most of the shell commands.

- Install NVM to manage Node versions.
  * `$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`
  * `nvm install node` (to install the latest Node version)
- Install MongoDB and create a database.
  * Follow steps (1) and (2) to use `.rpm` packages as described here: [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/).
  * Start up Mongo with `mongod`, or to detach it use `mongod --fork --syslog`.
  * Start the Mongo shell with `mongo` and create a database with `use scrabsterdb` (or whatever db name you're using in your `.env` file).
- Install Nginx and set up port mapping. This will allow you to serve your application to users at the server's public url without requiring a port to be appended.
  * `yum install nginx`
  * Map port 80 of your server to the port you've specified in your `.env` (e.g. 5000) by editing the file at `/etc/nginx/nginx.conf`. Under `server` configure the location as follows: 
    ```
    location / {
      proxy_set_header  X-Real-IP  $remote_addr;
      proxy_set_header  Host       $http_host;
      proxy_pass        http://127.0.0.1:5000;
    }
    ```
  * `service nginx start`
- Install Git: `yum install git`.
- Clone the repo from GitHub and create an `.env` file in the repo's root directory (see below for required variables).
- Install all application dependencies.
- Create a production build of the application with `ng build --prod`. If you encounter problems building on the AWS server, build on your local machine and commit the dist folder.
- Start up your Node server!

# Angular CLI notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
