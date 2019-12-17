const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: "groups"
  },
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: String
  },
  contactInfo: {
    email: String,
    phone: Number
  },
  attendances: [
    {
      attendance: {
        type: Schema.Types.ObjectId,
        ref: "attendances"
      },
      present: Boolean,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: {} });

module.exports = Member = mongoose.model("members", MemberSchema);
