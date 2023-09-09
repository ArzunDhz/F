"use client";
import {
  FaceBookIcon,
  InstagramIcon,
  LinkdinIcon,
  TwitterIcon,
} from "@public/icons";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as timeago from "timeago.js";

const GalleryCardContainer = ({ data, userId }) => {
  const isImageAlreadyLiked = data.likes.includes(userId);
  const [likeCount, setLikeCount] = useState(data.likes.length);
  const [isLikedOnFrontEnd, setIsLikedOnFrontEnd] =
    useState(isImageAlreadyLiked);
  const [isloading, setIsLoading] = useState(false);
  const widthHeightRatio = data.height / data.width;
  const galleryHeight = Math.ceil(350 * widthHeightRatio);
  const photoSpans = Math.ceil(galleryHeight / 10) + 1;
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

  const addOrRemoveLike = async (userId, imageId) => {
    setIsLoading(true);

    const { data } = await axios.put("api/like", { userId, imageId });
    if (data.message === "Liked") {
      setIsLikedOnFrontEnd(true);
    } else {
      setIsLikedOnFrontEnd(false);
    }

    if (isLikedOnFrontEnd) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div
        style={{ gridRow: `span ${photoSpans}` }}
        className="w-[350px] group justify-self-center relative"
      >
        {/* creatorInfo */}
        <div className="absolute z-10 flex items-center w-full p-2 space-x-3 transition duration-500 ease-in-out opacity-0 bg-gradient-to-b from-black group-hover:opacity-100">
          <Image
            src={data.creator_img}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full "
          />
          <h1 className="text-lg font-bold tracking-wider">
            {data.creatorName}
          </h1>
        </div>

        {/* main image container */}
        <div
          key={data?._id}
          className="relative overflow-hidden bg-gray-200 rounded-xl "
        >
          <Image
            src={data.image_url}
            alt={data._id}
            width={350}
            height={galleryHeight}
            sizes="250px"
          />
        </div>
        {/* like portion */}
        <div className="absolute top-0 right-[-15px] z-10 transition duration-500 ease-in-out opacity-0 group-hover:opacity-100 ">
          <div className="flex  items-center  flex-col p-2.5 ">
            <button
              disabled={isloading}
              onClick={() => addOrRemoveLike(userId, data._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isLikedOnFrontEnd ? "red" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={isLikedOnFrontEnd ? "red" : "white"}
                className="w-12 h-12 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <h1 className="text-lg font-bold tracking-wider">{likeCount}</h1>
          </div>
        </div>

        {/* share portion */}
        {/* share section */}

        <div
          onClick={() => setIsSmallDivVisible(!isSmallDivVisible)}
          className="absolute right-[-10px] flex w-full p-4 transition duration-500 ease-in-out opacity-0 top-20 group-hover:opacity-100  justify-end  "
        >
          <div className="">
            {isSmallDivVisible && (
              <div
                ref={smallDivRef}
                className="flex   justify-evenly items-center transition-transform duration-500 ease-out transform scale-100 bg-[rgba(0,0,0,0.9)]  rounded shadow-lg opacity-100 small-div"
              >
                <Image
                  onClick={() => openFaceBook(data.image_url)}
                  src={FaceBookIcon}
                  alt="fb"
                  className="cursor-pointer "
                />
                <Image
                  onClick={() => openTwitter(data.prompt, data.image_url)}
                  src={InstagramIcon}
                  alt="fb"
                  className="cursor-pointer "
                />
                <Image
                  onClick={() => openFaceBook(data.image_url)}
                  src={TwitterIcon}
                  alt="fb"
                  className="cursor-pointer "
                />
                <Image
                  onClick={() => openLinkedin(data.prompt, data.image_url)}
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

        {/* prompt section */}
        <div className="absolute z-10 w-full transition duration-500 ease-in-out opacity-0 bottom-2 bg-gradient-to-t from-black group-hover:opacity-100">
          <div className="flex justify-between">
            <div className="">
              <h1 className="text-lg font-bold tracking-wider">
                {data.prompt.length > 15
                  ? data.prompt.slice(0, 25) + "..."
                  : data.prompt}
              </h1>
              <h1 className="text-[15px] opacity-50 ">
                {timeago.format(data.createdAt)}
              </h1>
            </div>
            <svg
              onClick={() => {
                navigator.clipboard.writeText(data.prompt), alert("Copied");
              }}
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
      </div>
    </>
  );
};

export default GalleryCardContainer;
