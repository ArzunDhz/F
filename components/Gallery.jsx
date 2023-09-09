"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GalleryCardContainer from "./GalleryCardContainer";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState(null);
  useEffect(() => {
    const getImageData = async () => {
      const { data } = await axios.get("/api/gallery");
      setGalleryData(data.allImageData);
      console.log(galleryData);
    };
    getImageData();
  }, []);
  return (
    <>
      <section className=" grid  px-1 my-3 grid-cols-gallery auto-rows-[10px] ">
        {galleryData &&
          galleryData.map((photo) => <GalleryCardContainer data={photo} />)}
      </section>
    </>
  );
};

export default Gallery;
