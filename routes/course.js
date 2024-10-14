const express = require("express");
const courseRouter = express.Router();
const { courseModel } = require("../db");

courseRouter.get("/preview", async (req, res) => {
  const courses = await courseModel.find();

  if (!courses) {
    res.json({
      message: "No course found",
    });
    return;
  }

  res.json({
    message: "Your courses",
    courses,
  });
});

courseRouter.post("/purchase", async (req, res) => {
  const courseId = req.body.courseId;
  const course = await courseModel.findOne({
    _id: courseId,
  });

  if (!course) {
    res.json({
      message: "Course not found",
    });
    return;
  }

  res.json({
    message: "Course purchased successfuly",
    course,
  });
});

module.exports = courseRouter;
