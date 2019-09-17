# Check for exam

- Chart JS: https://www.chartjs.org/docs/latest/
- Heroku deploy: https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app
- Upload JSON to Mongodb: mongoimport -h localhost:27017 --db nodeExpress3 -c tweets --file gananLosCorruptos.json --jsonArray
- Fix ESLINT: eslint --debug C:\Users\Checho\Documents\UNIANDES\WEB\MidTerm\react-frontend\src\components\Component1\Component1.js --fix

# --Insert App Title Here

--Insert general app objective here

## Colaborators

- Sergio Guzmán Mayorga:

  [Personal Site](https://sguzmanm.github.io/i-am-sergio-guzman/) - [GitHub](https://github.com/sguzmanm)

## Links

**Deployed at:** --Insert deploy link

## Description

-- Insert detailed description here

## Objective

-- Insert Objective here

## Tecnologies used

This project was developed using the MERN stack.

- **Mongo DB**: MongoDB was used as a NOSQL database.
- **Express**: A fast, minimalistic and flexible framework for Node.js, it allows route handling in an easy way. https://expressjs.com/es/
- **React JS**: A Front End library useful for creating components. https://reactjs.org/
- **Node JS**: A javascript environment which allows to create a web server with javascript. https://nodejs.org

Some extra dependencies were included in the project. Each can be seen in the backend or react-front-end folders or in the package.json files in the respective folders.

The application is deployed in https://heroku.com/

## Instructions to execute

### Requisites

- **Node JS**
- **Heroku CLI (Optional, for replicating our deployment only)**

Verify that nodejs is installed by running "node -v" on terminal or cmd. It can be downloaded in https://nodejs.org/ (versión LTS)

### Steps to run development version

1. Check backend folder for complete instructions on how to execute the backend
2. Check frontend folder for complete instructions on how to execute the frontend

### Steps to deploy production version into Heroku

It is assumed that the Heroku CLI is setup in your computer for this and connected to a project. If you are not sure or do not have this, please visit https://devcenter.heroku.com/articles/getting-started-with-nodejs.

1. Follow build instructions on frontend folder
2. Setup env vars in heroku of the backend .env file, by [dashboard](https://dashboard.heroku.com/) or CLI with:

```
heroku config:set <KEY>=<value>
```

3. Deployment in heroku needs you to push only the "backend" folder into the heroku´s master branch. For this, use the following command:

```
git subtree push --prefix backend heroku master
```

## Screenshots

### Main Menu

-- Insert screenshot here

## License

This project is public under the MIT license, found [here](https://github.com/sguzmanm/academical-reborn/blob/master/LICENSE)
