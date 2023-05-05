import express, { Application } from 'express';
import api from './api/api';
import Database from './database/database';
import bodyParser from 'body-parser';

const app: Application = express();
const port: number = 3333;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/', api)

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
});

Database.initialize();
