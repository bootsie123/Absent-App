const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: String,
  password: {
    type: String,
    required: true
  },
  profileImg: {
    data: Buffer,
    contentType: String
  }
}, { timestamps: {} });

module.exports = User = mongoose.model("users", UserSchema);
