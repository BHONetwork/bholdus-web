/* eslint-disable react/jsx-no-target-blank */
import OptimizedImage from "../../common/optimized-image";
const PressItem = ({ data, index }) => {
  return (
    <div className="item-in-press">
      <div className="wrap-img">
        <a
          style={{ textDecoration: "none" }}
          href={data.url}
          target={data.newTab ? "_blank" : "_self"}
          rel={data.newTab ? "noopener noreferrer nofollow" : ""}
          title={data.title}
        >
          <OptimizedImage img={data.image} layout="intrinsic" />
        </a>
      </div>
    </div>
  );
};

export default PressItem;
