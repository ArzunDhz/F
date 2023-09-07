import { AninshImg, ArjunImg } from "@public/images";
import Image from "next/image";
import React from "react";

const GalleryCard = () => {
  return (
    <>
      <div className="w-[412px] h-[512px] rounded-lg bg-stone-900">
        <Image src={ArjunImg} className="w-full rounded-lg " />
        <h1> Prompt : A main with Specitacles</h1>
        <div className="flex items-center ">
          <Image src={AninshImg} className="w-10 h-10 rounded-full " />
          <h1>Anish </h1>
        </div>
        <h1> Created 10 min ago</h1>
      </div>
    </>
  );
};

export default GalleryCard;
