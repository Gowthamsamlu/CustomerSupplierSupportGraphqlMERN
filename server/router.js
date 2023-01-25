const bodyParser = require("body-parser");

const userRouter = require("./routes/user");

const router = {};

const jsonParser = bodyParser.json();
router.init = (app) => {
  app.use("/user", jsonParser, userRouter);
};

module.exports = router;
