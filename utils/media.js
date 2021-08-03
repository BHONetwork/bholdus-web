import { getBackendUrl } from "./api";
import _ from "lodash";

export function getMediaUrl(media) {
  let imageUrl = _.isString(media) ? media : media.url;
  imageUrl = imageUrl.startsWith("/") ? getBackendUrl(imageUrl) : imageUrl;
  imageUrl = imageUrl.replace(
    "bholdus.s3.ap-southeast-1.amazonaws.com",
    "cdn.bholdus.com"
  );
  return imageUrl;
}
