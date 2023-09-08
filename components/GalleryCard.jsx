"use client";

import {
  FaceBookIcon,
  InstagramIcon,
  LinkdinIcon,
  TwitterIcon,
} from "@public/icons";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import * as timeago from "timeago.js";
const GalleryCard = ({
  userName,
  userProfilePic,
  createdAt,
  prompt,
  imageUrl,
}) => {
  const openFaceBook = (link) => {
    window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      link
    )}`;
  };
  const openTwitter = (title, link) => {
    window.location.href = `https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(
      link
    )}`;
  };
  const openInstagram = (link) => {
    window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      link
    )}`;
  };
  const openLinkedin = (title, link) => {
    window.location.href = `https://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${title}&summary=${title}&source=${encodeURIComponent(
      link
    )}`;
  };

  const [isSmallDivVisible, setIsSmallDivVisible] = useState(false);
  const smallDivRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (smallDivRef.current && !smallDivRef.current.contains(event.target)) {
        setIsSmallDivVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className=" relative max-w-[712px] h-fit group  rounded-lg bg-stone-900  text-white ">
        {/* top section */}
        <div className="absolute w-full transition duration-500 ease-in-out rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-b from-black">
          <div className="flex items-center p-2.5 ">
            <Image
              src={userProfilePic}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full "
            />
            <h1 className="text-lg font-bold tracking-wider"> {userName} </h1>
          </div>
        </div>
        {/* prompt section */}
        <div className="absolute bottom-0 w-full transition duration-500 ease-in-out rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black">
          <div className="flex items-center justify-between  p-2.5 ">
            <div className="">
              <h1 className="text-lg font-bold tracking-wider">{prompt}</h1>
              <h1 className="text-[15px] opacity-50 ">
                {timeago.format(createdAt)}
              </h1>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
          </div>
        </div>

        {/* like portion */}
        <div className="absolute transition duration-500 ease-in-out opacity-0 bottom-[30%] right-0 group-hover:opacity-100 ">
          <div className="flex  items-center  flex-col p-2.5 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-12 h-12 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

            <h1 className="text-lg font-bold tracking-wider">1</h1>
          </div>
        </div>
        {/* share section */}

        <div
          onClick={() => setIsSmallDivVisible(!isSmallDivVisible)}
          className="absolute top-0 right-0 flex w-full p-4 transition duration-500 ease-in-out opacity-0 group-hover:opacity-100 "
        >
          <div className="w-full ">
            {isSmallDivVisible && (
              <div
                ref={smallDivRef}
                className="w-full h-[58px] flex  justify-evenly items-center transition-transform duration-500 ease-out transform scale-100 bg-[rgba(0,0,0,0.5)]  rounded shadow-lg opacity-100 small-div"
              >
                <Image
                  onClick={() => openFaceBook(imageUrl)}
                  src={FaceBookIcon}
                  alt="fb"
                  className="cursor-pointer "
                />
                <Image
                  onClick={() => openTwitter(prompt, imageUrl)}
                  src={InstagramIcon}
                  alt="fb"
                  className="cursor-pointer "
                />
                <Image
                  onClick={() => openFaceBook(imageUrl)}
                  src={TwitterIcon}
                  alt="fb"
                  className="cursor-pointer "
                />
                <Image
                  onClick={() => openLinkedin(prompt, imageUrl)}
                  src={LinkdinIcon}
                  alt="fb"
                  className="cursor-pointer "
                />
              </div>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8 cursor-pointer"
          >
            <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
          </svg>
        </div>

        {/* Main image portion */}
        <Image
          src={imageUrl}
          width={512}
          height={512}
          className="w-full h-full rounded-lg "
        />
      </div>
    </>
  );
};

export default GalleryCard;
