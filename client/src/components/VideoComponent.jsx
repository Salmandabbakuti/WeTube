import React from "react";
import { BiCheck } from "react-icons/bi";
import { Jazzicon } from "@ukstv/jazzicon-react";
import VideoPlayer from "./VideoPlayer";

export default function VideoComponent({ video }) {
  return (
    <div>
      <VideoPlayer hash={video.hash} />
      <div className="flex justify-between flex-row py-4 border-borderWhiteGray dark:border-borderGray border-b-2">
        <div>
          <h3 className="text-2xl dark:text-white">{video.title} </h3>
          <p className="text-gray-500 mt-1">
            {video.category + " • " + new Date(video.createdAt * 1000).toLocaleString("en-IN") + " • " + video.location}
          </p>
        </div>
      </div>
      <div>
        <div className="flex mt-5 flex-row items-center ">
          <div className="w-12">
            <Jazzicon address={video?.channel?.id} size={12} />
          </div>

          <div className="ml-3 flex flex-col">
            <p className="text-md flex items-center text-black dark:text-white mt-1">
              {video?.channel?.id.slice(0, 9) + "..." + video?.channel?.id.slice(-5)}
              <BiCheck size="20px" className="ml-1 fill-gray" />
            </p>
            <p className="text-sm flex items-center text-textSubTitle ">
              Video by {video?.channel?.owner}
            </p>
          </div>
        </div>
        <p className="text-sm text-black text-textSubTitle mt-4 ml-16">
          {video.description}
        </p>
      </div>
    </div>
  );
}
