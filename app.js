const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const path = require('path');
const morgan = require('morgan');
const config = require('./config/index');
const connectDB = require('./db');
const auth = require('./utils/auth');
const userRouter = require('./resources/user/user.router');
const accountRouter = require('./resources/account/account.route');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// cors config
app.use(cors())
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");  
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// })

// auth routes
app.post('/api/signup', auth.signup);
app.post('/api/signin', auth.signin);

// Protect all endpoints under v1
app.use('/v1', auth.protect);

// setup routers
app.use('/v1/user', userRouter);
app.use('/v1/account', accountRouter)


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