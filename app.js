const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const config = require('./config/config');
const connectDB = require('./db');
const userRouter = require('./resources/user/user.router');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

// setup routers
app.use('/v1/user', userRouter);

const start = async () => {
    try {
      await connectDB();
      app.listen(config.port, () => {
        console.log(`REST API on http://localhost:${config.port}/api`)
      })
    } catch(e) {
      console.error(e);
    }
  }
  
  module.exports = start;