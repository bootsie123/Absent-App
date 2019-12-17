const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "members"
    }
  ],
  attendances: [
    {
      type: Schema.Types.ObjectId,
      ref: "attendances"
    }
  ]
}, { timestamps: {} });

module.exports = Group = mongoose.model("groups", GroupSchema);
