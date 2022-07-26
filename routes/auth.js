const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // validating the user
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  //checking the user exist in database
  const emailExist = await User.findOne({ email: req.body.email });
  const usernameExist = await User.findOne({ username: req.body.username });

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  if (emailExist) {
    res.status(400).send("Email Already Exist");
  } else if (usernameExist) {
    res.status(400).send("username already exist");
  } else {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    try {
      const saveduser = await user.save();
      res.send({ user: user._id, email: user.email });
    } catch (err) {
      console.log(err);
    }
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  //checking the user exist in database
  const user = await User.findOne({ email: req.body.email });
  // const usernameExist = await User.findOne({ username: req.body.username });
  if (!user) {
    res.status(400).send("Email  is wrong");
  } else {
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      res.status(400).send(" Password is wrong");
    }
  }
  //creating and asigning token
  const token = jwt.sign(
    { _id: user._id, user_type: "user" },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send(token);
});
module.exports = router;
