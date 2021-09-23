const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// creating a new user in the User collection
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10); // auto-generating a salt
    const userData = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPwd,
      forename: req.body.forename,
      lastname: req.body.lastname,
      type: req.body.type,
    });
    res.status(201).send(userData);
  } catch (error) {
    console.log(error);
    res.status(422).send("Server error Occured");
  }
});

module.exports = router;
