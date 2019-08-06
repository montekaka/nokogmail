const mongoose = require('mongoose');

const schema = {
  email: {
    type: String,
    required: true,
    index: true,      
    trim: true
  },
  access_token: {
    type: String
  },
  scope: {
    type: String
  },
  token_type: {
    type: String
  },
  expiry_date: {
    type: Number
  }
};

const accountSchema = new mongoose.Schema(schema, { timestamps: true })

module.exports = accountSchema;