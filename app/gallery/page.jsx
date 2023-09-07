"use client";

import axios from "axios";
import React, { useEffect } from "react";
import "@styles/globals.css";
import GalleryCard from "@components/GalleryCard";
const Gallery = () => {
  useEffect(() => {
    const getImageData = async () => {
      const { data } = await axios.get("/api/gallery");
      console.log(data);
    };
    getImageData();
  }, []);

  return (
    <>
      <GalleryCard />
    </>
  );
};

export default Gallery;
