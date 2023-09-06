import React from "react";
import ReviewCard from "./ReviewCard";
import { Review } from "@config/Review";
const ReviewSection = () => {
  return (
    <>
      <section className="flex flex-col items-center min-h-screen mt-20 ">
        <h1 className="text-6xl text-center"> Reviews & Rating</h1>
        <div className="grid grid-cols-1 gap-20 mt-20 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 sm:gap-2">
          {Review.map((e) => (
            <ReviewCard data={e} key={e.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ReviewSection;
