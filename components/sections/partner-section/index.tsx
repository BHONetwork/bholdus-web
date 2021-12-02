import Section from "../sections";
import GroupPartners from "./partner-group";
import Image from "../../common/image";
import { groupByKey } from "../../../utils/others";

const PartnerSection = ({ data }) => {
  const groupPartners = groupByKey(data.partners, "type");
  return (
    <section id="our-partners">
      <div className="container">
        <div className="our-partners">
          <div
            className="title-section"
            data-aos="fade-down"
            data-aos-delay={400}
            data-aos-duration={1000}
          >
            {data?.smallTitle && data.smallTitle !== " " ? (
              <p className="title-top-section">{data.smallTitle}</p>
            ) : null}
            <p className="title-bot-section">{data.title}</p>
          </div>
          <GroupPartners groupPartners={groupPartners} />
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
