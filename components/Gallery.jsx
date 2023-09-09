"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GalleryCardContainer from "./GalleryCardContainer";
import { useSession } from "next-auth/react";
import Loading from "./Loading";

const Gallery = ({ DataForGallery }) => {
  const { data: session } = useSession();

  return (
    <>
      <section className=" grid  px-1 my-3 grid-cols-gallery auto-rows-[10px] ">
        {DataForGallery &&
          DataForGallery.map((photo) => (
            <GalleryCardContainer data={photo} userId={session?.user?.id} />
          ))}
        {!DataForGallery && (
          <div className="flex items-center justify-center min-h-screen text-8xl text-pop">
            <Loading />
          </div>
        )}
      </section>
    </>
  );
};

export default Gallery;
