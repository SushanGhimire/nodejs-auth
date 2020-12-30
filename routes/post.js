const express = require("express");
const router = express.Router();
const verify = require("./verifytoken");

router.get("/", verify, async (req, res) => {
  res.send(req.user._id);
});
module.exports = router;
