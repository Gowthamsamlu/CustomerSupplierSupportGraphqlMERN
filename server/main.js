const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const schema = require("./schema");
const mongoDBConnection = require("./config/db");
const setupCORS = require("./config/cors");
const initpassport = require("./utils/passport");
const permit = require("./utils/permit");
const router = require("./router");

require("dotenv").config();

const port = process.env.SERVER_PORT || 3000;
const JWTpassport = initpassport(passport);
const app = express();

// Setup cors
setupCORS(app);

// Authentication middlware using passport
app.use(
  cookieSession({
    name: "session",
    keys: ["keys1"],
    maxAge: 24 * 60 * 60 * 100,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", (req, res, next) => {
  JWTpassport.authenticate("jwt", { session: false }, (err, userJwt) => {
    if (err) {
      return res.status(HttpStatus.OK).send({
        status: "error",
        error: "UNAUTHORIZED",
        stack: err,
        logout: true,
      });
    }
    if (userJwt) {
      req.user = userJwt;
      if (typeof userJwt.aclGroup !== "undefined") {
        req.user.role = userJwt.aclGroup;
      }
    }
    return next();
  })(req, res, next);
});

router.init(app);
app.get("/", function (req, res) {
  return res.send({ status: "Success", message: "Hello world" });
});

app.use(
  "/graphql",
  permit.allow("all"),
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    context: { user: req.user },
  })),
);

mongoDBConnection();
app.listen(port, console.log(`Server running on port ${port}`));
