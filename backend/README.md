# --Insert Project Name here. Backend

This is the backend for the project.

## Description

-- Insert general description of backend tech and tools

### Libs

- cors: Enable cors for all requests
- dotenv: Use of environmental variables in .env files
- express: Node web framework used for building the REST services.
- express-validator: Validator of body request structures for Express.
- express-history-api-fallback: Ensure that when there is a route outside the main root (/) it is redirected to this resource.
- mongodb: Driver for connecting with our Mongo database in Atlas.
- morgan: Beautiful logging of REST actions.
- nodemon: Hot-reloading of the backend server.

### Folder Structure

- app: All app logic related components with a general routes file and a folder for each parent resource identified on the database. For each for these resources you have either more subresources with their respective routes.js file, or the following files:
  - controller: Receives all REST requests and delegates the results to querys.js.
  - querys: Communication with the MongoDB.
  - routes: RWST routes for communicating with the backend.
- readme: Images and other attachments used in this readme.
- util: Common features for the app, including db and errors management.
- app.js: Main app connection.

## Setup: Environmental variables

I am using environment variables in node throught a .env file. They are listed below:

### --List env variables

## Setup: Run the app

Once the .env file is properly located in the backend folder with the above properties. Open a terminal on this the same folder and run:

```
npm install
```

When libs are installed, run the next command for making the server run in port 4000:

```
npm start
```

If you wish to run in development mode ("hot reload" with nodemon) type:

```
npm run dev
```
