const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: "groups"
  },
  members: [
    {
      member: {
        type: Schema.Types.ObjectId,
        ref: "members"
      },
      present: Boolean
    }
  ]
}, { timestamps: {} });

module.exports = Attendance = mongoose.model("attendances", AttendanceSchema);
