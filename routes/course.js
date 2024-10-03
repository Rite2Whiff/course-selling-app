const express = require("express");
const courseRouter = express.Router();

courseRouter.get("/preview", (req, res) => {
  res.json({
    message: "You have successfully signed up",
  });
});

courseRouter.post("/purchase", (req, res) => {});

module.exports = courseRouter;
