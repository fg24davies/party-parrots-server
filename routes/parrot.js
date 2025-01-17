const express = require("express");
const router = express.Router();
const Parrot = require("../models/parrot");
const applicationRouter = require("./application");
const Application = require("../models/application");

router.get("/", async (req, res) => {
  try {
    const parrots = await Parrot.find();
    const approvedApplications = await Application.find({ approved: true });
    res.send({ parrots: parrots, approvedApplications: approvedApplications });
  } catch (error) {
    res.send(error);
  }
});

// create parrot route
router.post("/", async (req, res) => {
  console.log(req.body);
  const parrotData = new Parrot({
    name: req.body.name,
    charity: req.body.charity,
    species: req.body.species,
    age: req.body.age,
    location: req.body.location,
    geocode: {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
    gender: req.body.gender,
    bio: req.body.bio,
    specialNeeds: req.body.specialNeeds,
    imageUrl: req.body.imageUrl,
    user: req.body.user,
  });
  await parrotData
    .save()
    .then(() => {
      res.status(201).send(parrotData);
    })
    .catch(() => {
      res.status(422).send("Error - parrot not saved to database");
    });
});

router.get("/:parrotId", async (req, res) => {
  const parrotId = req.params.parrotId;

  try {
    const parrot = await Parrot.findOne({ _id: parrotId })
      .populate("user", "username")
      .exec();
    const applications = await Application.find({ parrot: parrotId })
      .populate("user", "username")
      .exec();
    res.send({ parrot: parrot, applications: applications });
  } catch (error) {
    res.send(error);
  }
});

router.use(
  "/:parrotId/applications",
  (req, res, next) => {
    req.parrotId = req.params.parrotId;
    next();
  },
  applicationRouter
);

// update parrot geocode
router.patch("/:parrotId", async (req, res) => {
  const parrotId = req.params.parrotId;
  const parrot = await Parrot.findOne({ _id: parrotId });

  console.log(parrot, req.body);
  if (parrot !== null) {
    try {
      (parrot.geocode = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }),
        parrot.save();
      res.send(parrot);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.status(400).send("Parrot not exist");
  }
});

module.exports = router;
