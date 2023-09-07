import { Image } from "@models/Image";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  connectToDB();

  const allImageData = await Image.find({});

  return NextResponse.json({ message: "Success", allImageData });
};
