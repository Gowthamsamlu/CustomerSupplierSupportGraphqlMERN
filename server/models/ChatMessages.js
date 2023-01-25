const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    message: { type: String, trim: true, unique: true, sparse: true },
    validflag: {
      type: Number,
      enum: [1, 2],
      default: 1,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

chatSchema.plugin(paginate);

module.exports = mongoose.model("Chat", chatSchema);
