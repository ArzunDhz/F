"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import "@styles/globals.css";
import GalleryCard from "@components/GalleryCard";
import Loading from "@components/Loading";
const Gallery = () => {
  const [galleryData, setGalleryData] = useState(null);
  useEffect(() => {
    const getImageData = async () => {
      const { data } = await axios.get("/api/gallery");
      setGalleryData(data.allImageData);
    };
    getImageData();
  }, []);

  return (
    <>
      <section className="w-full ">
        <h1 className="my-10 text-center text-8xl text-pop"> Fauro Gallery</h1>

        {galleryData ? (
          <div className="flex flex-wrap justify-center gap-1 ">
            {galleryData.map((e) => (
              <GalleryCard
                userName={e.creatorName}
                userProfilePic={e.creator_img}
                createdAt={e.createdAt}
                prompt={e.prompt}
                imageUrl={e.image_url}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
};

export default Gallery;
