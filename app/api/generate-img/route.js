import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { v2 as cloudinary } from "cloudinary";
import { Image } from "@models/Image";

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


export const config = {
runtime:'experimental-edge';
}
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

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
      {
        input: {
          prompt,
        },
      }
    );

    // const output = await replicate.run(
    //   "pagebrain/dreamshaper-v7:37c0a36ec213848452a7989fa348654cd9cb999df7238e7892488fcbbc4a124d",
    //   {
    //     input: {
    //       prompt,
    //       negative_prompt: negativeprompt,
    //       height,
    //       width,
    //     },
    //   }
    // );
    console.log(output);
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
    return NextResponse.status(500).json({ erroris: error });
  }
};
