import React, { useState, useEffect, useRef } from "react";
import { Header } from "./Header";
import Sidebar from "./Sidebar";
import { create } from "ipfs-http-client";
import { BiCloud, BiPlus } from "react-icons/bi";
import toast from "react-hot-toast";
import getContract from "../utils/getContract";
import "react-toggle/style.css"; // for ES6 modules

export default function Upload(props) {
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [isAudio, setIsAudio] = useState(false);
  const [formInput, setFormInput] = useState({});
  const [loading, setLoading] = useState(false);

  const ipfsClient = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  const thumbnailRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    const address = localStorage.getItem("walletAddress");
    if (address && address.startsWith("0x000000000000")) {
      props.history.push("/");
    }
  }, []);

  const handleInputChange = (e) => setFormInput({ ...formInput, [e.target.name]: e.target.value });

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("formInput:", formInput);
      // const { title, description, category, location, thumbnailHash, videoHash, isAudio } = formInput;
      if (!['title', 'description', 'category', 'location'].every((key) => formInput[key])) {
        // alert("Please fill out all fields");
        return toast.error("Please fill all the fields", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      };

      if (!thumbnail || !video) {
        return toast.error("Please add video and thumbnail.!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      const { path: thumbnailHash } = await ipfsClient.add(thumbnailRef.current.files[0]);
      const { path: videoHash } = await ipfsClient.add(videoRef.current.files[0]);
      console.log("Adding video to contract");

      let contract = await getContract();

      const tx = await contract.addVideo(
        formInput.title,
        formInput.description,
        formInput.category,
        formInput.location,
        thumbnailHash,
        videoHash
      );

      console.log("Transaction submitted. hash: ", tx.hash);
      await tx.wait();
      setLoading(false);
      toast.success("Video added successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      setLoading(false);
      console.log("Error uploading file: ", error);
    } finally {
      setLoading(false);
      props.history.goBack();
    }
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="mt-5 mr-10 flex  justify-end">
          <div className="flex items-center">
            <button
              className="bg-transparent  dark:text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6"
              onClick={props.history.goBack}
            >
              Discard
            </button>
            <button
              onClick={handleAddVideo}
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
            >
              <BiCloud />
              <p className="ml-2">Upload</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col m-10 	mt-5  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-gray-600 dark:text-[#9CA3AF]  text-sm">
              Title
            </label>
            <input
              value={formInput.title || ""}
              name="title"
              onChange={handleInputChange}
              placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
              className="w-[90%] dark:text-white  dark:placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:border-[#444752] focus:outline-none"
            />
            <label className="text-gray-600 dark:text-[#9CA3AF] mt-10 text-sm">
              Description
            </label>
            <textarea
              name="description"
              value={formInput.description || ""}
              onChange={handleInputChange}
              placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody."
              className="w-[90%] dark:text-white  dark:placeholder:text-gray-600 rounded-md mt-2  h-32 p-2 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:border-[#444752] focus:outline-none"
            />

            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5	">
                <label className="text-gray-600 dark:text-[#9CA3AF]  text-sm">
                  Location
                </label>
                <input
                  name="location"
                  value={formInput.location || ""}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Bali - Indonesia"
                  className="rounded-md dark:text-white mt-2 dark:placeholder:text-gray-600  h-12 p-2 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5	">
                <label className="text-gray-600 dark:text-[#9CA3AF]  text-sm">
                  Category
                </label>
                <select
                  name="category"
                  value={formInput.category || ""}
                  onChange={handleInputChange}
                  className=" rounded-md dark:text-white mt-2  h-12 p-2 dark:border-gray-600 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:text-[#9CA3AF] focus:outline-none"
                >
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>News</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <label className="text-gray-600 dark:text-[#9CA3AF]  mt-10 text-sm">
              Thumbnail
            </label>

            <div
              onClick={() => {
                thumbnailRef.current.click();
              }}
              className="border-2 w-64 dark:border-gray-600  border-dashed border-borderWhiteGray rounded-md mt-2 p-2  h-36 items-center justify-center flex"
            >
              {thumbnail ? (
                <img
                  onClick={() => {
                    thumbnailRef.current.click();
                  }}
                  src={URL.createObjectURL(thumbnail)}
                  alt="thumbnail"
                  className="h-full rounded-md"
                />
              ) : (
                <BiPlus size={40} color="gray" />
              )}
            </div>

            <input
              type="file"
              name="thumbnail"
              className="hidden"
              ref={thumbnailRef}
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
              }}
            />
          </div>

          <div
            onClick={() => {
              videoRef.current.click();
            }}
            className={
              video
                ? " w-96   rounded-md  h-64 items-center justify-center flex"
                : "border-2 dark:border-gray-600  w-96 border-dashed border-borderWhiteGray rounded-md mt-8   h-64 items-center justify-center flex"
            }
          >
            {video ? (
              <>
                {isAudio ? (
                  <audio
                    src={URL.createObjectURL(video)}
                    controls
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    controls
                    src={URL.createObjectURL(video)}
                    className="h-full rounded-md"
                  />
                )}
              </>
            ) : (
              <p className="dark:text-[#9CA3AF]">
                Upload {isAudio ? "Audio" : "Video"}
              </p>
            )}
          </div>
        </div>
        <input
          type="file"
          name="video"
          className="hidden"
          ref={videoRef}
          accept={isAudio ? "audio/*" : "video/*"}
          onChange={(e) => {
            setVideo(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
};
