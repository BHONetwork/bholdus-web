import PropTypes from "prop-types";
import { getMediaUrl } from "../../lib/media";
import { mediaPropTypes } from "../../lib/types";

const Video = ({
  media,
  poster,
  className,
  controls = true,
  autoPlay = false,
}) => {
  const fullVideoUrl = getMediaUrl(media.url);
  const fullPosterUrl = getMediaUrl(poster?.url);

  return (
    <video
      className={className}
      poster={fullPosterUrl}
      controls={controls}
      autoPlay={autoPlay}
    >
      <source src={fullVideoUrl} type={media.mime} />
    </video>
  );
};

Video.propTypes = {
  media: mediaPropTypes.isRequired,
  poster: mediaPropTypes,
  className: PropTypes.string,
  controls: PropTypes.bool,
  autoPlay: PropTypes.bool,
};

export default Video;
