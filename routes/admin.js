const express = require("express");
const adminRouter = express.Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminAuth } = require("../middleware/admin");

adminRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);

  await adminModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.json({
    message: "Admin Successfully signed up",
  });
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const currAdmin = await adminModel.findOne({
    email: email,
  });

  if (!currAdmin) {
    res.json({
      message: "Admin not found in our database",
    });
    return;
  }

  const comparePassword = await bcrypt.compare(password, currAdmin.password);

  if (comparePassword) {
    const token = jwt.sign(
      {
        id: currAdmin._id,
      },
      process.env.ADMIN_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.json({
      message: "Invalid admin credentials",
    });
  }
});

adminRouter.post("/course", adminAuth, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price, imageURL } = req.body;

  const course = await courseModel.create({
    title,
    description,
    price,
    imageURL,
    creatorId: adminId,
  });

  res.json({
    message: "course created successfully",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminAuth, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price, imageURL, courseId } = req.body;

  const currCourse = await courseModel.findOne({
    _id: courseId,
    creatorId: adminId,
  });

  if (!currCourse) {
    res.json({
      message: "Course not found",
    });
    return;
  }

  const updateCourse = await courseModel.updateOne({
    title,
    description,
    price,
    imageURL,
  });

  res.json({
    message: "Course updated sucessfully",
    courseId: updateCourse._id,
  });
});

adminRouter.get("/course/bulk", adminAuth, async (req, res) => {
  const adminId = req.adminId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  if (!courses) {
    res.json({
      message: "Course not found",
    });
  } else {
    res.json({
      message: "Courses found successfully",
      courses,
    });
  }
});

module.exports = adminRouter;
