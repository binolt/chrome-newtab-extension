const express = require("express");
const menuRouter = express.Router();

menuRouter.get("/", (req, res) => {
  res.send("yep");
})

module.exports = menuRouter;