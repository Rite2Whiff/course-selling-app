const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const user = new Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
});

const admin = new Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
});

const course = new Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorId: ObjectId,
});

const purchase = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const userModel = mongoose.model("user", user);

const adminModel = mongoose.model("admin", admin);

const courseModel = mongoose.model("course", course);

const purchaseModel = mongoose.model("purchase", purchase);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
