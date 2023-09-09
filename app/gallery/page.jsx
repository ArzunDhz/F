"use client";

import React, { useEffect, useState } from "react";
import "@styles/globals.css";
import Gallery from "@components/Gallery";
import axios from "axios";

const GalleryPage = () => {
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const getImageData = async () => {
      const { data } = await axios.get("/api/gallery");
      setFilteredData(data.allImageData);
    };
    getImageData();
  }, []);

  return (
    <>
      <h1 className="text-center text-8xl">Gallery</h1>
      <Gallery DataForGallery={filteredData} />
    </>
  );
};

export default GalleryPage;
