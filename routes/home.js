const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Parrot Party server");
});

module.exports = router;
