import Section from "../sections";
import ServiceCard from "./service-card";
import Image from "../../common/image";
const backgrounds = [
  "linear-gradient(-234deg, #6ae472 0%, #4bc253 100%)",
  "linear-gradient(-234deg, #e0707e 0%, #e85f70 100%)",
  "linear-gradient(-234deg, #ea9d64 0%, #fa8936 100%)",
  "linear-gradient(-234deg, #D150FF 0%, #BD00FF 100%)",
  "linear-gradient(-234deg, #29aceb 0%, #0090d5 100%)",
];

const shadows = [
  "0 0 30px rgb(75 194 83 / 74%)",
  "0 0 30px rgb(232 95 112 / 74%)",
  "0 0 30px rgb(250 136 54 / 74%)",
  "0 0 30px rgb(187 0 255 / 74%)",
  "0 0 30px rgb(0 144 213 / 74%)",
];

const ServiceSection = ({ data }) => {
  return (
    <Section id="services" smallTitle={data.smallTitle} title={data.title}>
      <div className="services-container container">
        {data.services.map((service: any, index: number) => (
          <ServiceCard
            key={service.id}
            data={service}
            background={backgrounds[index % 5]}
            shadow={shadows[index % 5]}
            index={index}
          />
        ))}
      </div>
      {data.imageBackground ? (
        <Image img={data.imageBackground} className="services-bg" />
      ) : null}
    </Section>
  );
};

export default ServiceSection;
