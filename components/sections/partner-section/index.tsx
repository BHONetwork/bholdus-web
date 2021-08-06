import Section from "../sections";
import GroupPartners from "./partner-group";
import Image from "../../common/image";
import { groupByKey } from "../../../utils/others";

const PartnerSection = ({ data }) => {
  const groupPartners = groupByKey(data.partners, "type");
  console.log(groupPartners);
  return (
    <Section id="partners" smallTitle={data.smallTitle} title={data.title}>
      <GroupPartners groupPartners={groupPartners} />
      {data.imageBackground ? (
        <Image img={data.imageBackground} classWrapName="partners-bg" />
      ) : null}
    </Section>
  );
};

export default PartnerSection;
