let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const common = require('../common/utils');

var User = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true
  }
}, {
  timestamps: true
});

//We'll use this later on to make sure that the user trying to log in has the correct credentials
User.methods.isValidPassword = async function (password) {
  const user = this;
  // console.log()
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

module.exports = mongoose.model('User', User);