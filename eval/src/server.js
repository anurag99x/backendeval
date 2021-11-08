const mongoose = require("mongoose");
const connect = require("./configs/db");
const express = require("express");
const userController = require("./controller/user.controller");
const app = express();

app.use(express.json());

app.use("/users", userController);

app.listen(1234, async function () {
  await connect();
  console.log("Listening on port 1234");
});
