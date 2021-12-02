import Section from "../sections";
import GroupPartners from "./partner-group";
import { groupByKey } from "../../../utils/others";
import { useRef } from "react";
import { addClassElement, useScrollPosition } from "../../../utils/hooks";

const PartnerSection = ({ data }) => {
  const sectionRef = useRef(null);
  let locked = false;
  useScrollPosition(
    ({ currPos }) => {
      console.log(currPos, locked);
      if (currPos.y < 650 && !locked) {
        locked = true;
        addClassElement(
          "#our-partners .our-partners .title-section",
          "top-to-bot"
        );
        addClassElement(
          "#our-partners .our-partners .title-partners",
          "top-to-bot"
        );
        const items = document.querySelectorAll(
          `#our-partners .our-partners .strategic-partners .list-strategic .item-strategic`
        );
        if (items)
          items.forEach((item, idx) => {
            setTimeout(() => {
              item.classList.add(`bot-to-top`);
              item.classList.add(`opacity-1`);
            }, idx * 200);
          });
      }
    },
    [],
    sectionRef
  );
  const groupPartners = groupByKey(data.partners, "type");
  return (
    <section id="our-partners" ref={sectionRef}>
      <div className="container">
        <div className="our-partners">
          <div className="title-section">
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
