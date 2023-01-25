const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    phone: { type: String, trim: true, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountStatus: {
      type: String,
      enum: ["allowed", "terminated", "blocked", "new"],
      default: "new",
    },
    accountType: {
      type: String,
      enum: ["supplier", "customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(paginate);

module.exports = mongoose.model("User", userSchema);
