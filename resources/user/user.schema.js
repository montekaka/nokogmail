const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const accountSchema = require('./../account/account.schema');

const schema = {
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },    
    email: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    accounts: [accountSchema]
};

const userSchema = new mongoose.Schema(schema, { timestamps: true })

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function(password, user) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }
      resolve(user)
    })
  })
}

module.exports = userSchema;