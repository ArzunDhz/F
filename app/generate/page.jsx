"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import "@styles/globals.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Loading from "@components/Loading";
import { CloseIcon, SettingIcon } from "@public/icons";

const Generate = () => {
  const { data: session, status } = useSession();
  const [genearteImage, setGenerateImage] = useState(null);
  const [isloadng, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [settingToggle, setSettingToggle] = useState(false);
  const [negativePromptText, setNegativePromptText] = useState("");
  const [outputSlider, setOutputSlider] = useState(0);
  const [negativePrompt, setNegativePrompt] = useState(true);
  const [size, setSize] = useState({ width: 512, height: 512 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/generate-img",
        {
          prompt: prompt,
          negativeprompt: negativePromptText,
          userId: session?.user.id,
          userName: session.user.name,
          userProfilePic: session.user.image,
          width: size.width,
          height: size.height,
        },
        { timeout: 1000000 }
      );

      setGenerateImage(data.sendImage);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const toggleNegativePrompt = () => {
    setNegativePrompt((prev) => !prev);
  };
  return (
    <>
      <section className="flex text-black dark:text-white  w-full h-[calc(100vh-82px)]  ">
        {/* half part */}
        <div className="w-[35%]   lg:flex justify-center items-center  sm:hidden md:hidden ">
          <div className=" w-[400px] p-5 bg-white  shadow-2xl rounded-lg   dark:bg-secondary-dark">
            <h1 className="mt-5 text-3xl text-center ">Custom Inputs</h1>
            <div className="flex flex-col mt-5 space-y-9 4 buttons div">
              <div className="flex justify-evenly ">
                <button
                  onClick={() => setSize({ width: 704, height: 512 })}
                  className="w-[100px] h-12 border-pop border-2 hover:border-white rounded-[10px]  dark:bg-secondary-dark bg-white shadow-xl"
                >
                  704x512
                </button>
                <button
                  onClick={() => setSize({ width: 576, height: 1024 })}
                  className="w-[100px] h-12 border-pop border-2 hover:border-white rounded-[10px]  dark:bg-secondary-dark bg-white shadow-xl"
                >
                  576x1024
                </button>
              </div>
              <div className="flex justify-evenly ">
                <button
                  onClick={() => setSize({ width: 576, height: 384 })}
                  className="w-[100px] h-12 border-pop border-2 hover:border-white rounded-[10px]  dark:bg-secondary-dark bg-white shadow-xl"
                >
                  576x384
                </button>
                <button
                  onClick={() => setSize({ width: 256, height: 128 })}
                  className="w-[100px] h-12 border-pop border-2 hover:border-white rounded-[10px]  dark:bg-secondary-dark bg-white shadow-xl"
                >
                  256x128
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-5">
              <button className=" w-[100px] h-12 border-pop border-2  bg-white shadow-xl hover:border-white rounded-[10px] dark:bg-secondary-dark">
                Output: {outputSlider}
              </button>

              <input
                type="range"
                className="mt-5   h-2 w-[250px] cursor-pointer border-transparent  bg-pop"
                id="customRange1"
                min="0"
                max="5"
                value={outputSlider}
                onChange={(e) => setOutputSlider(e.target.value)}
              />
            </div>
            <div className="mt-5 ml-[72px] flex flex-col">
              <label className="relative inline-flex items-center mr-5 cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div
                  onClick={() => {}}
                  className="w-11 h-6  bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"
                ></div>
                <span className="ml-3 font-bold text-gray-900 dark:text-gray-300">
                  Seed
                </span>
              </label>

              <input
                className=" rounded-lg w-[100px] h-[30px] mt-5 rounded-m indent-3 "
                type="text"
                placeholder="seed..."
              />
            </div>
          </div>
        </div>
        {/* search part  */}
        <div className="lg:w-[75%] md:w-full  sm:w-full   h-full flex justify-center items-center  flex-col space-y-8  ">
          {/* search container */}

          <form onSubmit={handleSubmit} className=" md:w-[512px]  mt-10">
            <div className="flex justify-center mb-6 ">
              <input
                disabled={isloadng}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                id="large-input"
                className="block sm:w-[300px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between mb-5 sm:w-[300px] sm:ml-3">
              <label class="relative  items-center  cursor-pointer  inline-flex">
                <input type="checkbox" value="" className="sr-only peer" />
                <div
                  onClick={() => setNegativePrompt((prev) => !prev)}
                  className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"
                ></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Negative Prompt{" "}
                  <span className="ml-4 text-pop">
                    Size:{size.width + "x" + size.height}
                  </span>
                </span>
              </label>
              <div
                className=" lg:hidden"
                onClick={() => {
                  setSettingToggle(true);
                }}
              >
                <Image src={SettingIcon} />
              </div>
            </div>

            <div className="flex justify-center mb-6 ">
              <input
                disabled={negativePrompt || isloadng}
                type="text"
                value={negativePromptText}
                onChange={(e) => setNegativePromptText(e.target.value)}
                id="large-input"
                className={`${
                  negativePrompt
                    ? " sm:w-[90%]   opacity-20 cursor-not-allowed block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    : " sm:w-[90%]  block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }`}
              />
            </div>
            <button type="Submit" className="hidden ">
              Submit
            </button>
          </form>
          {/* generated image */}
          <div className=" h-[512px] w-[512px]  border-2  rounded-lg border-[rgba(63,63,63,0.5)] flex justify-center items-center sm:w-[90%]">
            {isloadng ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                <div className=" h-[512px] w-[512px] ">
                  {genearteImage ? (
                    <Image
                      width={512}
                      height={512}
                      className="w-full h-full "
                      src={genearteImage}
                      alt="generatedimg"
                    />
                  ) : (
                    <>
                      <div className="flex flex-col items-center ">
                        <svg
                          className="w-10 h-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                        <h1 className="opacity-50 ">Start generating Image</h1>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {settingToggle && (
          <div className="absolute w-full min-h-screen bg-[rgba(63,63,63,0.5)] lg:hidden flex justify-center  ">
            <div className="w-[95%] h-[520px] p-5  mt-[50px]  bg-white rounded-lg shadow-2xl opacity-100 dark:bg-secondary-dark">
              <div
                onClick={() => setSettingToggle(false)}
                className="flex justify-end "
              >
                <h1 className="text-xl ">X</h1>
              </div>
              <h1 className="mt-5 text-3xl text-center ">Custom Inputs</h1>

              <div className="flex flex-col mt-5 space-y-9 4 buttons div">
                <div className="flex justify-evenly ">
                  <button
                    onClick={() => setSize({ width: 704, height: 512 })}
                    className="w-[100px] h-12 border-pop border-2 hover:border-white rounded-[10px]  dark:bg-secondary-dark bg-white shadow-xl"
                  >
                    704x512
                  </button>
                  <button
                    onClick={() => setSize({ width: 576, height: 1024 })}
                    className="w-[100px] h-12 border-pop border-2 hover:border-white rounded-[10px]  dark:bg-secondary-dark bg-white shadow-xl"
                  >
                    576x1024
                  </button>
                </div>
                <div className="flex justify-evenly ">
                  <button
                    onClick={() => setSize({ width: 576, height: 384 })}
                    className="w-[100px] h-12 border-pop border-2 hover:border-white rounded-[10px]  dark:bg-secondary-dark bg-white shadow-xl"
                  >
                    576x384
                  </button>
                  <button
                    onClick={() => setSize({ width: 256, height: 128 })}
                    className="w-[100px] h-12 border-pop border-2 hover:border-white rounded-[10px]  dark:bg-secondary-dark bg-white shadow-xl"
                  >
                    256x128
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-5">
                <button className=" w-[100px] h-12 border-pop border-2  bg-white shadow-xl hover:border-white rounded-[10px] dark:bg-secondary-dark">
                  Output: {outputSlider}
                </button>

                <input
                  type="range"
                  className="mt-5   h-2 w-[250px] cursor-pointer border-transparent  bg-pop"
                  id="customRange1"
                  min="0"
                  max="5"
                  value={outputSlider}
                  onChange={(e) => setOutputSlider(e.target.value)}
                />
              </div>
              <div className="mt-5 ml-[72px] flex flex-col">
                <label className="relative inline-flex items-center mr-5 cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div
                    onClick={() => {}}
                    className="w-11 h-6  bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"
                  ></div>
                  <span className="ml-3 font-bold text-gray-900 dark:text-gray-300">
                    Seed
                  </span>
                </label>

                <input
                  className=" rounded-lg w-[100px] h-[30px] mt-5 rounded-m indent-3 "
                  type="text"
                  placeholder="seed..."
                />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setSettingToggle(false)}
                  type="button"
                  className="px-4 py-2 bg-pop rounded-xl"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Generate;
