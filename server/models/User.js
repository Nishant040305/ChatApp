const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  displayname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  verify:{
    type:Boolean,
    default:false
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: '',
  },
});

module.exports = model('User', UserSchema);