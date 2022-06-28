import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { Header } from "./Header";
import Sidebar from "./Sidebar";
import VideoCard from "./VideoCard";
import { GET_VIDEOS } from "../constants/graphqlQueries";
import Loader from "./Loader";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleSearchInput, setTitleSearchInput] = useState("");
  const [categorySearchInput, setCategorySearchInput] = useState("");

  const client = useApolloClient();

  const getVideos = async () => {
    setLoading(true);
    client
      .query({
        query: GET_VIDEOS,
        variables: {
          first: 200,
          skip: 0,
          orderBy: "createdAt",
          orderDirection: "desc",
          where: {
            ...titleSearchInput && { title_contains_nocase: titleSearchInput },
            ...categorySearchInput && { category_contains_nocase: categorySearchInput },
          }
        },
        fetchPolicy: "network-only"
      })
      .then(({ data }) => {
        setLoading(false);
        setVideos(data.videos);
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong. please try again.!", err.message);
      });
  };

  useEffect(() => {
    getVideos();
  }, [titleSearchInput, categorySearchInput]);

  return (
    <div className="w-full   flex flex-row">
      <Sidebar updateCategory={(category) => setCategorySearchInput(category)} />
      <div className="flex-1 h-screen flex flex-col">
        <Header search={(text) => setTitleSearchInput(text)} />
        <div className="flex flex-row flex-wrap">
          {videos.map((video) => (
            <Link to={{ pathname: `/video/${video.id}`, state: video }} key={video.id} >
              <div className="w-80">
                <VideoCard video={video} />
              </div>
            </Link>
          ))}

          {loading && (
            <div className="flex-1 flex flex-row flex-wrap">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <div className="w-80" key={i}>
                    <Loader />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
