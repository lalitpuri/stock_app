# stock_app

  This a simple page applicatin which demonstrates use of socket and chart with node js and vue js.

## Project setup

**NOTE**: This Application built using **node v14.14.0**,**npm v6.14.8**,**mongodb v3.6.3** and **@vue/cli 4.5.12**

**Prerequisite:**
```
mongodb
node
npm
vue
```

[mongodb installation guide](https://docs.mongodb.com/manual/installation/)

[node installation](https://nodejs.org/en/download/)

[vue-cli installation guide](https://cli.vuejs.org/guide/installation.html)

Sample database provided in this repository under `dump` folder.After you installed above CLI tools, migrate database on your local mongodb using below command:
```
mongorestore --db stock_db {YOUR_PATH}/dump/stock_db
```
After migrating successfully , move to root folder of repository and install all the node dependencies using below command:
```
npm install
```
Project setup is completed. Let's start frontend and backend apps.

## Backend
Start your backend app using below command
```
node server.js
```
**NOTE:** Make sure you are in root directory of repository
You will get output something like this:
[click here to see output](https://imgur.com/N28lL4H)


## Frontend
start your frontend app using below command
```
npm run serve
```
You should get output something like this :
[click here to see output](https://imgur.com/rHQ4ktO)

## Final Output

Your page should look like this : [final page output](https://imgur.com/KDqIHLG)
