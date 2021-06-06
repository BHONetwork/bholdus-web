import classNames from "classnames";

import { getMediaUrl } from "../../../utils/media";
import { VideoProps } from "./types";

const Video = (props: VideoProps) => {
  const { video, poster, className, ...restProps } = props;
  const fullVideoUrl = getMediaUrl(video.url);
  const fullPosterUrl = getMediaUrl(poster?.url);

  return (
    <video
      className={classNames(className)}
      poster={fullPosterUrl}
      {...restProps}
    >
      <source src={fullVideoUrl} type={video.mime} />
    </video>
  );
};

export default Video;
