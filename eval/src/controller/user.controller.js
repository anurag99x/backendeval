const express = require("express");
const fs = require("fs");
const upload = require("../middlewares/file-upload");

const router = express.Router();

const User = require("../modal/user.model");

router.post("/single", upload.single("userImages"), async function (req, res) {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      roles: req.body.roles,
      profile_photo_url: req.file.path,
    });
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post(
  "/multiple",
  upload.multiple("userImages"),
  async function (req, res) {
    const filePaths = req.files.map((file) => file.path);
    console.log(filePaths);

    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        profile_photo_url: filePaths,
      });
      return res.status(201).send(user);
    } catch (err) {
      filePaths.map((path) => fs.unlinkSync(path));
      return res.status(500).send(err.message);
    }
  }
);

module.exports = router;
