import Image from "../../common/image";
import Text from "../../common/text";

const ServiceCard = ({ data, background, index }) => {
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
        }}
      />
      <Image img={data.image} />
      <Text className="service-card-text">{data.title}</Text>
    </div>
  );
};

export default ServiceCard;
