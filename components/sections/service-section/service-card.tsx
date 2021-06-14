import OptimizedImage from "../../common/optimized-image";
import Text from "../../common/text";

const ServiceCard = ({ data, background, shadow, index }) => {
  return (
    <div
      className="service-card"
      data-aos="fade-up"
      data-aos-delay={index * 200}
    >
      <div
        className="service-card-bg"
        style={{
          background,
          boxShadow: `${shadow}`,
        }}
      />
      <div className="service-card-img">
        <OptimizedImage
          img={data.image}
          width={100}
          height={100}
          layout="intrinsic"
        />
      </div>
      <Text className="service-card-text">{data.title}</Text>
    </div>
  );
};

export default ServiceCard;
