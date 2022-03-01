import { useRef } from "react";
import { addClassElement, useScrollPosition } from "../../../utils/hooks";
import TeamProfile from "./team-profile";

const TeamSection = ({ data }) => {
  const id = data.fixId ? data.fixId : `team-${data.id}`;
  const sectionRef = useRef(null);
  let locked = false;
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < 650 && !locked) {
        locked = true;
        addClassElement(`#${id} .title-section`, "top-to-bot opacity-1");
        const items = document.querySelectorAll(
          `#${id} .our-brain .list-our-brain .item-our-brain`
        );
        if (items)
          items.forEach((item, idx) => {
            setTimeout(function () {
              item.classList.add("bot-top-0");
              item.classList.add("opacity-1");
            }, idx * 500);
          });
      }
    },
    [],
    sectionRef
  );
  return (
    <section id={id} ref={sectionRef}>
      <div className="container">
        <div className="our-brain">
          <div className="title-section">
            {data?.smallTitle && data.smallTitle !== " " ? (
              <p className="title-top-section">{data.smallTitle}</p>
            ) : null}

            <h2 className="title-bot-section">{data.title}</h2>
          </div>
          <div className="list-our-brain">
            {data.persons.map((person: any, index: number) => (
              <TeamProfile key={person.id} data={person} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
