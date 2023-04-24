//requires: body-parser, mongoose, dotenv, routes (within api.js)
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const dotenv = require('dotenv');
dotenv.config({path: 'process.env'});
const swaggerui = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");

//initialize app and middleware 
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;


//connect to the database using MongoDB Atlas connection string, then start listening
mongoose
  .connect(process.env.DB.toString(), { useNewUrlParser: true })
  .then(() => {
    console.log(`Database connected successfully`);
    //Begin listening
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use('/', routes);
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec));
app.use((err, req, res, next) => {
  console.log(err);
  next();
});