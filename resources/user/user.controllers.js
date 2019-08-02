const user = require('./user.model');

// GET all
const getAll = (req, res) => {
  user.getMany()
  .then((collection) => {
    res.status(202).json({data: collection});
  })
  .catch((err) => {
    res.status(404).json({error_message: err});
  })
}

const create = (req, res) => {
  const params = {
    name: req.body['name'],
    email: req.body['email']
  }

  user.create(params)
  .then((data) => {
    res.status(202).json({data: data});
  })
  .catch((err) => {
    res.status(404).json({error_message: err});
  })  
}

const update = (req, res) => {
  // const id = req.params.id;
  const id = req.user._id.toString();
  
  const params = req.body;
  
  if (req.params.id !== id) {
    res.status(404).json({error_message: 'Not auth'});
  } else {
    user.update(id, params)
    .then((data) => {
      res.status(202).json({data: data});
    })
    .catch((err) => {
      res.status(404).json({error_message: err});
    }); 
  }

}

const remove = (req, res) => {
  const id = req.params.id;
  
  user.remove(id)
  .then((data) => {
    res.status(202).json({data: data});
  })
  .catch((err) => {
    res.status(404).json({error_message: err});
  });   
}

module.exports = {
  create: create,
  getAll: getAll,
  update: update, 
  remove: remove
}