const models = require('./../index');

const User = models.User;

const create = (params) => {
  const user = new User(params);
  return user.save();
}

const getMany = (params) => {
  // if params is empty {}, then return everything
  const query = User.find(params);
  return query.exec();
}

const get = (params) => {
  const query = User.findOne(params);
  return query.exec();
}

module.exports = {
  create: create,
  get: get,
  getMany: getMany
}