import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Upload from "./components/Upload";
import LandingPage from "./components/LandingPage";
import VideoPage from "./components/VideoPage";
export default function App() {
  const [UserWallet, setUserWallet] = useState(null);

  let navigate = useNavigate();

  const checkedWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(80001).toString(16)}` }],
      });
      console.log("Connected", accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);

      navigate("/app");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkedWallet();
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="/app" element={<Home userWallet={UserWallet} />} />
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/video" element={<VideoPage />} />
    </Routes>
  );
}
