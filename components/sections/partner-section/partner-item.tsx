/* eslint-disable react/jsx-no-target-blank */
import OptimizedImage from "../../common/optimized-image";
const PartnerItem = ({ data, index }) => {
  return (
    <div className="item-strategic">
      <div className="wrap-img">
        <a
          style={{ textDecoration: "none" }}
          href={data.url}
          target={data.newTab ? "_blank" : "_self"}
          rel={data.newTab ? "noopener noreferrer" : ""}
          title={data.title}
        >
          <OptimizedImage img={data.image} layout="intrinsic" />
        </a>
      </div>
    </div>
  );
};

export default PartnerItem;
