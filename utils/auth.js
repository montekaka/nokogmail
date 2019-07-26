const config = require('./../config/index');
const User = require('./../resources/index').User;
const jwt = require('jsonwebtoken');

// create a new json web token
// give an user object, it will return a jwt
const newToken = (user) => {
  return jwt.sign({id: user.id}, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

// given a token, it will verfiy
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if(err) return reject(err);
      resolve(payload);
    })
  })
}

const signup = (req, res) => {
  if(!req.body.email || !req.body.password || !req.body.name) {
    return res.status(404).json({error_message: 'Email, password and name require.'}); 
  }
  const params = {
    email: req.body['email'],
    name: req.body['name'],
    password: req.body['password']
  };
  
  User.create(params)
  .then((user) => {
    const token = newToken(user);
    return res.status(201).json({data: token});
  })
  .catch((err) => {
    console.log(err);
    return res.status(404).json({error_message: err});
  })
}

const signin = (req, res) => {
  if(!req.body.email || !req.body.password) {
    return res.status(404).json({error_message: 'Email and password require.'}); 
  }
  
  User.findOne({email: req.body.email})
  .then((user) => {
    return user.checkPassword(req.body.password);
  })
  .then((authUser) => {
    return newToken(authUser);
  })
  .then((token) => {
    return res.status(201).json({data: token});
  })  
  .catch((err) => {
    console.log(err);
    return res.status(401).json({error_message: "Email and password are not matched."});
  })

}

const protect = (req, res, next) => {
  console.log(req.headers.authorization)
  if(!req.headers.authorization) return res.status(401).json({error_message: "No auth"});

  const token = req.headers.authorization.split('Bearer ')[1];  
  if(!token) {
    return res.status(401).json({error_message: "No auth"});
  }
  verifyToken(token)
  .then((payload) => {
    return User.findById(payload.id)
    .select('-password')
    .lean() // return as a JSON document, not mongo document
    .exec();
  })
  .then((user) => {
    req.user = user;
    next();
  })
  .catch((err) => {
    console.log(err);
    return res.status(401).json({error_message: "No auth"});
  })
  next();
}

module.exports = {
  signin: signin,
  signup: signup,
  protect: protect
}