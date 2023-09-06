import mongoose, { Schema, models } from "mongoose";

const ImageSchema = mongoose.Schema({
  image_url: String,
  prompt: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creatorId: {
    type: Schema.ObjectId,
  },
  creator_img: String,
  creatorName: String,
});

export const Image = models.Image || mongoose.model("Image", ImageSchema);
