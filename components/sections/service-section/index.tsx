import Section from "../sections";
import ServiceCard from "./service-card";

const backgrounds = [
  "linear-gradient(100.94deg, #16B04B 22.46%, #39B54A 131.92%)",
  "linear-gradient(296.38deg, #FF9A9E 11.14%, #DDA9AB 89.59%)",
  "linear-gradient(90deg, #FFC062 0%, #FF9F0E 100%)",
  "linear-gradient(90deg, #D150FF 0%, #BD00FF 100%)",
  "linear-gradient(90deg, #73DDFF 0%, #00C2FF 100%)",
];

const ServiceSection = ({ data }) => {
  return (
    <Section
      id="services"
      className="mt-20 lg:mt-40 scroll-margin-top"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="flex md:justify-between flex-col lg:flex-row">
        {data.services.map((service: any, index: number) => (
          <ServiceCard
            key={service.id}
            data={service}
            background={backgrounds[index]}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
};

export default ServiceSection;
