"use client";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const PriceCardComponent = ({ data }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className="h-[550px]   sm:h-[400px]  sm:mt-10 bg-gradient-to-b  dark:from-black dark:via-stone-900 dark:to-violet-900 rounded-lg shadow-2xl  sm:w-[300px] md:w-[500px] w-[350px]"
      >
        <h1 className="text-3xl font-bold text-center "> {data.title}</h1>
        <div className="flex flex-col h-full rounded-lg FeatureList">
          <ul className="flex flex-col sm:h-[65%] h-[70%]  ml-6 text-xl sm:text-[16px]  justify-evenly ">
            {(data?.features).map((feature) => (
              <li> -{feature} </li>
            ))}
          </ul>

          <div className="flex flex-col items-center mb-6 Price">
            <h1 className="text-6xl font-bold sm:text-4xl ">{data.price}</h1>
            <button className="px-8 py-2 rounded-full bg-pop">Subscribe</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceCardComponent;
