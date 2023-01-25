const mongoose = require("mongoose");
const colors = require("colors");
const cryptr = require("cryptr");
require("dotenv").config();

const decipher = new cryptr("dummypasswfv90rVFl4Oce4OuEordresetkey", {
  pbkdf2Iterations: 10000,
  saltLength: 10,
});
const MONGO_PASSWORD = decipher.decrypt(process.env.MONGO_PASSWORD);

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  const connectionString =
    process.env.MONGO_HOST === "localhost"
      ? `mongodb://${process.env.MONGO_HOST}:27017/${process.env.MONGO_DB}`
      : `mongodb+srv://${process.env.MONGO_USER}:${MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  const conn = mongoose
    .connect(connectionString)
    .then(() => {
      console.log(
        `MongoDB Connected to host ${process.env.MONGO_HOST}`.cyan.underline
          .bold,
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
