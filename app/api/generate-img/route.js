import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { v2 as cloudinary } from "cloudinary";
import { Image } from "@models/Image";
var sendImage = "";
const replicate = new Replicate({
  auth: "r8_6MbqvBIVUJ2ew9g7DigtMn2A0oTY4u91oQP6J",
});

cloudinary.config({
  cloud_name: "dldlrp6ta",
  api_key: "249798923551299",
  api_secret: "AgGJs1lYRM3Za9LKTX6wCoo5lgA",
  secure: true,
});

export const POST = async (req, res) => {
  const { prompt, userId, userProfilePic, negativeprompt, userName } =
    await req.json();
  console.log(prompt, userId);
  try {
    const output = await replicate.run(
      "pagebrain/dreamshaper-v7:c180b0a592fe7be34db228e17ab1ddea337af32bd3e297e388be74cb03656583",
      {
        input: {
          prompt,
          negative_prompt: negativeprompt,
          height: 640,
          width: 448,
        },
      }
    );
    console.log(output[0]);
    await cloudinary.uploader.upload(output[0]).then(async (result) => {
      const image = await Image.create({
        image_url: result.url,
        creator_img: userProfilePic,
        prompt: prompt,
        creatorId: userId,
        creatorName: userName,
      });
      sendImage = result.url;
    });
    return NextResponse.json({ message: "Success", sendImage });
  } catch (error) {
    console.log(error);
  }
};
