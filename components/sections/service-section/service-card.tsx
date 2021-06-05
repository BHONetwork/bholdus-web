import Image from "../../common/image";
import Text from "../../common/text";

const ServiceCard = ({ data, background, index }) => {
  return (
    <div className="flex mb-5 justify-center lg:md-0">
      <div
        className="service-card flex items-center flex-col pt-16 pb-9 rounded w-56 h-64 lg:w-40 lg:h-56 xl:w-56 xl:h-64 relative"
        data-aos="fade-up"
        data-aos-delay={index * 200}
      >
        <div
          className="service-carg-bg absolute top-1/2 left-1/2 w-full h-full"
          style={{
            background,
          }}
        />
        <Image className="mb-5 z-10" img={data.image} />
        <Text size="normal" weight="bold" className="z-10">
          {data.title}
        </Text>
      </div>
    </div>
  );
};

export default ServiceCard;
