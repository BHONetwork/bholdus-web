import { useRef } from "react";
import { addClassElement, useScrollPosition } from "../../../utils/hooks";
import PressItem from "./press-item";

const PressSection = ({ data }) => {
  const sectionRef = useRef(null);
  let locked = false;
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < 650 && !locked) {
        locked = true;
        addClassElement("#in-press .in-press .title-section", "top-to-bot");
        const items = document.querySelectorAll(
          `#in-press .in-press .list-in-press .item-in-press`
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
  return (
    <section id="in-press" ref={sectionRef}>
      <div className="container">
        <div className="in-press">
          <div className="in-press">
            <div className="title-section">
              {data?.smallTitle && data.smallTitle !== " " ? (
                <p className="title-top-section">{data.smallTitle}</p>
              ) : null}

              <h2 className="title-bot-section">{data.title}</h2>
            </div>
            <div className="list-in-press">
              {data.press.map((press: any, index: number) => (
                <PressItem key={press.id} data={press} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
