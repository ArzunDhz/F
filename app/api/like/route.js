import { Image } from "@models/Image";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const PUT = async (req, res) => {
  connectToDB();
  const data = await req.json();
  var message = " ";
  await Image.findById(data.imageId).then(async (doc) => {
    const isLiked = doc.likes.includes(data.userId);
    if (isLiked) {
      const index = doc.likes.indexOf(data.userId);
      doc.likes.splice(index, 1);
      await doc.save();
      message = "UnLiked";
      return message;
    } else {
      doc.likes.push(data.userId);
      await doc.save();
      message = "Liked";
      return message;
    }
  });
  return NextResponse.json({ message });
};
