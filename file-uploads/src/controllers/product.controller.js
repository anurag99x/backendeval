const express = require("express");
const fs = require("fs");
const upload = require("../middlewares/file-upload");

const router = express.Router();

const Product = require("../models/product.model");

router.post(
  "/single",
  upload.single("productImages"),
  async function (req, res) {
    // console.log(req.file);
    try {
      const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        image_urls: req.file.path,
      });
      return res.status(201).send(product);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
);

router.post(
  "/multiple",
  upload.any("productImages"),
  async function (req, res) {
    const filePaths = req.files.map((file) => file.path);
    console.log(filePaths);

    try {
      const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        image_urls: filesPaths,
      });
      return res.status(201).send("Multiple");
    } catch (err) {
      filePaths.map((path) => fs.unlinkSync(path));
      return res.status(500).send(err.message);
    }
  }
);

//base64 encoded

module.exports = router;
