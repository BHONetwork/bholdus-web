import Section from "../sections";
import PartnerItem from "./partner-item";
import Image from "../../common/image";

const PartnerSection = ({ data }) => {
  return (
    <Section id="partners" smallTitle={data.smallTitle} title={data.title}>
      <div className="partners-container container">
        {data.partners.map((partner: any, index: number) => (
          <PartnerItem key={partner.id} data={partner} index={index} />
        ))}
      </div>
      {data.imageBackground ? (
        <Image img={data.imageBackground} classWrapName="partners-bg" />
      ) : null}
    </Section>
  );
};

export default PartnerSection;
