import BoardProfile from "./advisor-profile";
import { useScrollPosition, addClassElement } from "../../../utils/hooks";
import { useRef } from "react";
const AdvisorSection = ({ data }) => {
  const sectionRef = useRef(null);
  const id = data.fixId ? data.fixId : `advisor-${data.id}`;
  let locked = false;
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < 650 && !locked) {
        locked = true;
        addClassElement(`#${id} .title-section`, "top-to-bot opacity-1");
        const items = document.querySelectorAll(
          `#${id} .our-board .list-our-board .item-our-board`
        );
        if (items)
          items.forEach((item, idx) => {
            if (idx % 2 === 0) {
              setTimeout(function () {
                item.classList.add("left-to-right-2");
                item.classList.add("opacity-1");
              }, idx * 500);
            } else {
              setTimeout(function () {
                item.classList.add("right-to-left-50vw");
                item.classList.add("opacity-1");
              }, idx * 500);
            }
          });
      }
    },
    [],
    sectionRef
  );
  return (
    <section id={id} ref={sectionRef}>
      <div className="container">
        <div className="our-board">
          <div className="title-section">
            {data?.smallTitle && data.smallTitle !== " " ? (
              <p className="title-top-section">{data.smallTitle}</p>
            ) : null}
            <h2 className="title-bot-section">{data.title}</h2>
          </div>
          <div className="list-our-board">
            {data.persons.map((person: any, index: number) => (
              <BoardProfile key={person.id} data={person} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorSection;
