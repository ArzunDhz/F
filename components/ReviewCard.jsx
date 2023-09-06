"use client";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Image from "next/image";
import React from "react";
import { StarIcon } from "@public/icons";
const ReviewCard = ({ data }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div
      data-aos="flip-left"
      data-aos-delay="150"
      className="h-[500px]   sm:h-fit  sm:mt-10 bg-gradient-to-b
      dark:from-black dark:via-stone-900  
       dark:to-slate-950 rounded-[70px] shadow-2xl 
        sm:w-[300px] md:w-[400px] w-[200px]"
    >
      <div className="flex flex-col items-center h-full p-10 rounded-lg ">
        <Image
          className="h-[215px] rounded-full w-[210px]"
          src={data?.image_url}
        />
        <h1 className="text-2xl font-bold text-center "> {data.user}</h1>
        <p className="text-sm text-center ">{data.comment}</p>
        <div className="flex  ml-[-40px] ">
          {data.rating.map((e) => (
            <Image src={StarIcon} width={60} height={60} alt="Star" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
