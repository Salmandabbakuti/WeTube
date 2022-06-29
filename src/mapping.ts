import { VideoUploaded as VideoUploadedEvent } from "../generated/OurTube/OurTube";
import { Video, Channel } from "../generated/schema";

export function handleVideoUploaded(event: VideoUploadedEvent): void {
  let video = new Video(event.params.id.toString());
  let channel = Channel.load(event.params.author.toHex());
  if (!channel) {
    channel = new Channel(event.params.author.toHex()); // create a new channel with address as Id of the video author
    channel.owner = event.params.author;
    channel.createdAt = event.block.timestamp;
    channel.save();
  }
  video.hash = event.params.hash;
  video.title = event.params.title;
  video.description = event.params.description;
  video.location = event.params.location;
  video.category = event.params.category;
  video.thumbnailHash = event.params.thumbnailHash;
  video.isAudio = event.params.isAudio;
  video.date = event.params.date;
  video.channel = event.params.author.toHex();
  video.createdAt = event.block.timestamp;
  video.save();
}
