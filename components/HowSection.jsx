"use client";
import { WaterImg } from "@public/images";
import Aos from "aos";
import Image from "next/image";
import React, { useEffect } from "react";

const HowSection = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <section
        data-aos="fade-up"
        data-aos-delay="150"
        className="flex min-h-screen space-x-2 bg-white sm:flex-col md:justify-evenly dark:bg-black"
      >
        <div className="w-1/2 sm:w-full sm:mt-20 ">
          <h1 className="text-[70px] md:text-[40px] sm:text-[30px]  text-pop font-[1000]  ">
            How to generate AI images
          </h1>
          <ol className="flex flex-col space-y-4 text-2xl text-black md:mt-10 sm:text-sm dark:text-white ">
            <li>
              <span className="mr-6 text-5xl font-bold sm:text-2xl">1.</span>
              Login or Create your Account
            </li>
            <button className="p-2 mt-2 w-[200px]  sm:w-[150px] text-black bg-white shadow-2xl rounded-3xl">
              Login Now
            </button>
            <li>
              <span className="mr-6 text-5xl font-bold sm:text-2xl">2.</span>
              Click Create Button at Top Right corner
            </li>
            <li>
              <span className="mr-6 text-5xl font-bold sm:text-2xl">3.</span>
              Enter your Prompt
            </li>
          </ol>
        </div>
        <div className="flex justify-center ">
          <Image
            className="w-[400px] h-[500px] sm:w-[270px] sm:h-[400px] rounded-xl "
            src={WaterImg}
          ></Image>
        </div>
      </section>
    </>
  );
};

export default HowSection;
