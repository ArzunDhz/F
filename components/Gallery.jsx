"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GalleryCardContainer from "./GalleryCardContainer";
import { useSession } from "next-auth/react";

const Gallery = () => {
  const { data: session } = useSession();

  const [galleryData, setGalleryData] = useState(null);
  useEffect(() => {
    const getImageData = async () => {
      const { data } = await axios.get("/api/gallery");
      setGalleryData(data.allImageData);
    };
    getImageData();
  }, []);

  galleryData && console.log(galleryData);

  return (
    <>
      <section className=" grid  px-1 my-3 grid-cols-gallery auto-rows-[10px] ">
        {galleryData &&
          session &&
          galleryData.map((photo) => (
            <GalleryCardContainer data={photo} userId={session?.user?.id} />
          ))}
        {!session && (
          <div className="flex items-center justify-center min-h-screen text-8xl text-pop">
            <h1> Login In FIrst</h1>
          </div>
        )}
      </section>
    </>
  );
};

export default Gallery;
