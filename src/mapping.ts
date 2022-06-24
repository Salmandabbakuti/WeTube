import { VideoAdded as VideoAddedEvent } from "../generated/WeTube/WeTube";
import { Video } from "../generated/schema";

export function handleVideoAdded(event: VideoAddedEvent): void {
  let video = new Video(event.params.id.toString());
  video.title = event.params.title;
  video.description = event.params.description;
  video.category = event.params.category;
  video.location = event.params.location;
  video.thumbnailHash = event.params.thumbnailHash;
  video.videoHash = event.params.videoHash;
  video.owner = event.params.owner;
  video.createdAt = event.params.createdAt;
  video.save();
}
