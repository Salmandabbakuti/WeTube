import { BrowserRouter, Route, Routes } from "react-router-dom";
import Videos from "./components/Videos";
import Upload from "./components/Upload";
import LandingPage from "./components/LandingPage";
import VideoPage from "./components/VideoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/videos" element={<Videos key={Math.random()} />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}