const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const config = require('./config/index');
const connectDB = require('./db');
const auth = require('./utils/auth');
const userRouter = require('./resources/user/user.router');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

// auth routes
app.post('/api/signup', auth.signup);
app.post('/api/signin', auth.signin);

// Protect all endpoints under v1
app.use('/v1', auth.protect);
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