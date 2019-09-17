# Colombian Government Open Data Visualizator Frontend

This is the frontend for the project: Colombian Government Open Data Visualizator.

## Description

The frontend was built using React as the main library.
**Deployed at:** https://colombiangovopendatavis.firebaseapp.com/

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

This will generate a build folder with the production ready version of the frontend. With this "build" folder you can deploy the app in a static web server of your preference.

In the specific case of this project, I used Firebase CLI to deploy the app at "https://colombiangovopendatavis.firebaseapp.com/"; for this reason, you can find in this project 3 config files: ".firebase",".firebaserc" and "firebase.json"

## Example inputs in the app

- link: https://www.datos.gov.co/resource/fcsx-656w.json
- numeric_label: numero_de_habitantes

## Fix linting

```
eslint --debug <Path to file> --fix
```

## Folder structure

- .firebase: Firebase config dir.
- public: Public files, including index.html, icons and favicon.
- src: Contains the code developed for the application.
  - App.js: Contains the app component. This is the main component of the app.
  - assets: Contains main assets of the project: icons, images, etc.
  - components: Contains all app components besides app itself
  - index.js: Main file needed for react to build the SPA
- build: Where the production ready app is located in order to be deployed in a static server.
- .firebasesrc: Project name for firebase CLI deployment.
- firebase.json: Setup of folder for deploying files from "build" config.
