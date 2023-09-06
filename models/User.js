import mongoose, { models } from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  image: String,
});

export const User = models.User || mongoose.model("User", userSchema);
