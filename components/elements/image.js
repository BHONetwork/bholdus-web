import { getMediaUrl } from "../../lib/media";
import PropTypes from "prop-types";
import { mediaPropTypes } from "../../lib/types";

const Image = ({ media, className, style }) => {
  const { url, alternativeText } = media;
  const fullUrl = getMediaUrl(url);

  return (
    <img
      src={fullUrl}
      alt={alternativeText || ""}
      className={className}
      style={style}
    />
  );
};

Image.propTypes = {
  media: mediaPropTypes.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Image;
