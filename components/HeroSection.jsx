import { HeroImg } from "@public/images";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <section className="flex min-h-screen space-x-2 md:items-center sm:flex-col md:justify-evenly">
        <div className="w-1/2 sm:w-full sm:mt-20 ">
          <h1 className="text-[70px] sm:text-[30px] purple_gradient  font-[1000]  ">
            Let You Imagination Turn Into Reality
          </h1>
        </div>
        <div className="flex justify-center ">
          <Image
            className="w-[400px] sm:w-[270px] sm:h-[400px] rounded-xl hover:scale-105 "
            src={HeroImg}
          ></Image>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
