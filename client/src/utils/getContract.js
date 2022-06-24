import { ethers } from "ethers";

const abi = [
  "function addVideo(string _title, string _description, string _category, string _location, string _thumbnailHash, string _videoHash)",
  "function currentVideoId() view returns (uint256)",
  "function videos(uint256) view returns (uint256 id, string title, string description, string category, string location, string thumbnailHash, string videoHash, address owner, uint256 createdAt)",
  "event VideoAdded(uint256 id, string title, string description, string category, string location, string thumbnailHash, string videoHash, address owner, uint256 createdAt)"
];

export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(
    "0xba230443bc99008b0dbfAcF79a6c3168d926C1D8",
    abi,
    signer
  );
  console.log(contract);
  return contract;
}
