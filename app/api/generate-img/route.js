import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { v2 as cloudinary } from "cloudinary";
import { Image } from "@models/Image";
import OpenAI from "openai";
var sendImage = "";
const replicate = new Replicate({
  auth: "r8_IIUXxJmBaYiGyVIfiR94pxlJ1BQlO4q4SuTt6",
});

cloudinary.config({
  cloud_name: "dldlrp6ta",
  api_key: "249798923551299",
  api_secret: "AgGJs1lYRM3Za9LKTX6wCoo5lgA",
  secure: true,
});

export const POST = async (req, res) => {
  const {
    prompt,
    userId,
    userProfilePic,
    negativeprompt,
    userName,
    height,
    width,
  } = await req.json();
  console.log(prompt, userId, height, width);
  try {
    const output = await replicate.run(
      "pagebrain/dreamshaper-v7:37c0a36ec213848452a7989fa348654cd9cb999df7238e7892488fcbbc4a124d",
      {
        input: {
          prompt,
          negative_prompt: negativeprompt,
          height,
          width,
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
        height,
        width,
      });
      sendImage = result.url;
    });
    return NextResponse.json({ message: "Success", sendImage });
  } catch (error) {
    console.log(error.response.data);
  }
};
