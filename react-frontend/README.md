# Colombian Government Open Data Visualizator

This is the frontend for the project: Colombian Government Open Data Visualizator.

## Description

The frontend was built using React as the main library.

## Libs

- react: Frontend library of the project
- react-dom: Dependency needed by react
- react-scripts: Dependency needed by react
- navio: Navio for visualization

## Setup: Run the app

Open a terminal or cmd in this folder and run:

```
npm install
```

When libs are installed, run the next command for making the frontend run in development mode:

```
npm start
```

The app should be running at port 3000, this is made for developing. Once the app is ready for production run:

```
npm run build
```

This will generate a dist folder with the production ready version of the frontend. Please post it in a server for displaying it.

## Folder structure

- src: Contains the code developed for the application
  - App.js: Contains the app component. This is the main component of the app
  - assets: Contains main assets of the project: icons, images, etc.
  - components: Contains all app components besides app itself
  - index.js: Main file needed for react to build the SPA
  - public: Public files
- dist: Where the production ready app is located in order to be copied to the backend
