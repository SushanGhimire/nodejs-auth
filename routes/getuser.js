const express = require("express");
const { model } = require("../models/user");
const user = require("../models/user");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
