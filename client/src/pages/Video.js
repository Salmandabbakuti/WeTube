import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoComponent from "../components/VideoComponent";
import Video from "../components/Video";
import getContract from "../utils/getContract";
import { Link, useLocation } from "react-router-dom";
import { GET_VIDEOS } from "../constants/graphqlQueries";

export default function VideoPage(props) {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const { id } = state;
      setVideo(state);
      getRelatedVideos(id);
    }
  }, [state]);

  const client = useApolloClient();
  const getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  };

  const getRelatedVideos = (IdToExclude) => {
    client
      .query({
        query: GET_VIDEOS,
        variables: {
          first: 20,
          skip: 0,
          orderBy: "createdAt",
          orderDirection: "desc",
          where: {
            id_not: IdToExclude
          }
        },
        fetchPolicy: "network-only"
      })
      .then(({ data }) => {
        console.log("videos", data.videos);
        setRelatedVideos(data.videos);
      })
      .catch((err) => {
        alert("Something went wrong. please try again.!", err.message);
      });
  };

  return (
    <div className="w-full  flex flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        {video && (
          <div className="flex flex-col m-10 justify-between	  lg:flex-row">
            <div className="lg:w-4/6 w-6/6">
              <VideoComponent video={video} />
            </div>
            <div className="w-2/6">
              <h4 className="text-md font-bold dark:text-white ml-5 mb-3 text-black">
                Related Videos
              </h4>
              {relatedVideos.map((video) => (
                <Link
                  to={`/video?id=${video.id}`}
                  state={video}
                  key={video.id}
                >
                  <Video video={video} horizontal={true} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
