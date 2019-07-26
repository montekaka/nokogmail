const schema = {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true
    }
};

module.exports = schema;