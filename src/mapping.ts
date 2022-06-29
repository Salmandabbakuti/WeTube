import { VideoAdded as VideoAddedEvent } from "../generated/WeTube/WeTube";
import { Video, Channel } from "../generated/schema";

export function handleVideoAdded(event: VideoAddedEvent): void {
  let video = new Video(event.params.id.toString());
  let channel = Channel.load(event.params.owner.toHex());
  if (!channel) {
    channel = new Channel(event.params.owner.toHex()); // create a new channel with address as Id of the video owner
    channel.owner = event.params.owner;
    channel.createdAt = event.block.timestamp;
    channel.save();
  }
  video.title = event.params.title;
  video.description = event.params.description;
  video.category = event.params.category;
  video.location = event.params.location;
  video.thumbnailHash = event.params.thumbnailHash;
  video.videoHash = event.params.videoHash;
  video.channel = event.params.owner.toHex();
  video.createdAt = event.params.createdAt;
  video.save();
}
