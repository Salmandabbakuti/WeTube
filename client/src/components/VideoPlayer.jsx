import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

export default function VideoPlayer({ hash }) {
  let url = "https://ipfs.io/ipfs/" + hash;
  return (
    <Plyr
      source={{
        type: "video",
        title: "Example title",
        sources: [
          {
            src: url,
            type: "video/mp4",
          },
        ],
      }}
      options={{
        autoplay: true,
      }}
      autoPlay={true}
    />
  );
}
