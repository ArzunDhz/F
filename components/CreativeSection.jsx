"use client";
import { CollectionImg, HeroImg } from "@public/images";
import Image from "next/image";
import React, { useEffect } from "react";
import Aos from "aos";
import Link from "next/link";
const CreativeSection = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <section
        data-aos="fade-up"
        data-aos-delay="150"
        className="flex min-h-screen space-x-2 sm:flex-col-reverse md:justify-evenly dark:bg-black"
      >
        <div className="flex justify-center ">
          <Image
            className="w-[450px]  h-[520px] sm:w-[320px] sm:h-[400px] rounded-xl "
            src={CollectionImg}
          ></Image>
        </div>

        <div className="w-1/2 sm:w-full sm:mt-20 ">
          <h1 className="text-[50px] sm:text-[30px]  md:mt-14 md:text-[35px] text-pop  font-[1000]  ">
            "Creativity is the brush that paints the canvas of innovation,
            turning imagination into reality." - ChatGPT
          </h1>
          <Link href={"/generate"}>
            {" "}
            <button className="p-2 mt-2 text-black bg-white shadow-2xl rounded-3xl">
              Create Now
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CreativeSection;
