require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const adminRouter = require("./routes/admin");
const mongoose = require("mongoose");
app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000, () => {
    console.log("Your app is up and successfully running on port 3000");
  });
}

main();
