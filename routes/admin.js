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
    messgae: "Successfully signed up",
  });
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const currAdmin = await adminModel.findOne({
    email: email,
  });

  if (!currAdmin) {
    res.json({
      messgae: "Admin not found in our database",
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
      messgae: "Invalid admin credentials",
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
    messgae: "course created successfully",
    courseId: course._id,
  });
});

adminRouter.put("/course", (req, res) => {});

adminRouter.get("/course/bulk", (req, res) => {});

module.exports = adminRouter;
