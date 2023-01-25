const cors = require("cors");

const whitelist = ["http://localhost:3000", "http://localhost:5000"];

const setupCORS = (app) => {
  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    }),
  );
  app.options(
    "*",
    cors({
      credentials: true,
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    }),
  );
};

module.exports = setupCORS;
