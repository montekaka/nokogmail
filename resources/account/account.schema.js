const mongoose = require('mongoose');

const schema = {
  email: {
    type: String,
    required: true,
    index: true,      
    trim: true
  },
  token: {
    type: String
  }
};

const accountSchema = new mongoose.Schema(schema, { timestamps: true })

module.exports = accountSchema;