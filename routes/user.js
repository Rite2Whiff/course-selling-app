const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middleware/user");

userRouter.post("/signup", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 5);

  await userModel.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  res.json({
    message: "Successfully signed up",
  });
});

userRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const currUser = await userModel.findOne({
    email: email,
  });

  if (!currUser) {
    res.json({
      message: "Invalid credentials",
    });
    return;
  }

  const comparePassword = await bcrypt.compare(password, currUser.password);

  if (comparePassword) {
    const token = jwt.sign(
      {
        id: currUser._id,
      },
      process.env.USER_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
});

userRouter.get("/purchases", userAuth, async (req, res) => {
  const userId = req.userId;
  if (userId) {
    res.json({
      message: "user exists",
    });
  } else {
    res.json({
      message: "no purchses found",
    });
  }
});

module.exports = userRouter;
