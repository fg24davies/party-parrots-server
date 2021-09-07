if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuid } = require("uuid");
// const { application } = require("express");

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

//from npm multer-s3 documenation
const s3 = new aws.S3();

let upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: "public-read",
    metadata: (file, cb) => {
      cb(null, { fileName: file.fieldname });
    },
    key: (req, cb) => {
      cb(null, req.s3Key); // the image path
    },
  }),
});

const singleFileUpload = upload.single("image"); // accept a single file

const uploadToS3 = (req, res) => {
  req.s3Key = uuid(); // generating an UUID for the image path
  let downloadUrl = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${req.s3Key}`;
  return new Promise((resolve, reject) => {
    return singleFileUpload(req, res, (error) => {
      if (error) return reject(error);
      return resolve(downloadUrl);
    });
  });
};

router.post("/", async (req, res) => {
  uploadToS3(req, res)
    .then((downloadUrl) => {
      return res.status(200).send({ downloadUrl }); // this is saved the database as imgUrl
    })
    .catch((error) => {
      return res.status(400).send({ error });
    });
});

router.get("/", (res) => {
  res.send("image upload");
});

module.exports = router;
