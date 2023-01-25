const express = require("express");
const HTTPStatus = require("http-status");
const Joi = require("joi-oid");
const JoiPhone = Joi.extend(require("joi-phone-number"));
const { has, isEmpty } = require("lodash");
const jwt = require("jwt-simple");

const permit = require("../utils/permit");
const { comparePassword, hashPassword } = require("../utils/userAuth");

const User = require("../models/user");

const router = express.Router();

router.post("/signin", permit.allow("all"), async (req, res) => {
  const requestSchema = Joi.object({
    email: Joi.string().required().error(new Error("Email invalid")),
    password: Joi.string().required().error(new Error("Password invalid")),
  });

  const validSchema = requestSchema.validate(req.body);
  if (validSchema.error) {
    return res.status(HTTPStatus.BAD_REQUEST).send({
      status: "validationError",
      message: validSchema.error.message,
    });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(HTTPStatus.OK).send({
        status: "error",
        message: "User not available in records",
      });
    const validPassword = await comparePassword(
      req.body.password,
      user.password,
    );
    if (validPassword) {
      // Generating access token
      const iat = new Date().getTime() / 1000;
      const exp = iat + parseInt(process.env.JWT_SESSION_LENGTH, 10);
      const payload = {
        aud: process.env.JWT_AUDIENCE,
        iss: process.env.JWT_ISSUER,
        iat,
        exp,
        userId: user.id,
      };
      const token = jwt.encode(payload, process.env.JWT_SECRET);
      return res.status(HTTPStatus.OK).send({
        status: "success",
        token: `JWT ${token}`,
      });
    } else
      return res.status(HTTPStatus.OK).send({
        status: "error",
        message: "Incorrect password",
      });
  } catch (err) {
    console.log(err);
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
      status: "error",
      error: err,
    });
  }
});

module.exports = router;
