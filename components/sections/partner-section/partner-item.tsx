/* eslint-disable react/jsx-no-target-blank */
import classNames from "classnames";
import OptimizedImage from "../../common/optimized-image";
const PartnerItem = ({ data, index }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 200}
      className={classNames("partner-item", {
        "partner-strategy": data.type === "strategy",
      })}
    >
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
  );
};

export default PartnerItem;
