import React from "react";
import PriceCardComponent from "./PriceCardComponent";
import { PriceData } from "@config/Price";
const PricingSection = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="mt-10 text-center text-purple-500 lg:text-6xl md:text-4xl sm:text-3xl">
          Pricing and Usage
        </h1>
        <div className="grid grid-cols-1 gap-20 mt-20 place-content-center lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 sm:gap-2">
          {PriceData.map((e) => (
            <PriceCardComponent key={e.id} data={e} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PricingSection;
