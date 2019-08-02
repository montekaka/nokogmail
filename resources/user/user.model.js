const models = require('./../index');

const User = models.User;

const create = (params) => {
  const user = new User(params);
  return user.save();
}

const getMany = (params) => {
  // if params is empty {}, then return everything
  const query = User.find(params).select('-password'); // excludes the password field
  return query.exec();
}

const get = (params) => {
  const query = User.findOne(params);
  return query.exec();
}

const update = (id, params) => {
  const query = User.findByIdAndUpdate(id, params, {new: true});
  return query.exec();
}

const remove = (id) => {
  const query = User.findByIdAndRemove(id);
  return query.exec();
}

module.exports = {
  create: create,
  get: get,
  getMany: getMany,
  update: update,
  remove: remove
}