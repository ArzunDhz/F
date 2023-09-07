"use client";

import axios from "axios";
import React, { useEffect } from "react";
import "@styles/globals.css";
const Gallery = () => {
  useEffect(() => {
    const getImageData = async () => {
      const { data } = await axios.get("/api/gallery");
      console.log(data);
    };
    getImageData();
  }, []);

  return <div>Gallery</div>;
};

export default Gallery;
