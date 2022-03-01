import OptimizedImage from "../../common/optimized-image";
import { useScrollPosition, addClassElement } from "../../../utils/hooks";
import { useRef } from "react";
const TokenomicSection = ({ data }) => {
  const sectionRef = useRef();
  let locked = false;
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < 680 && !locked) {
        locked = true;
        addClassElement("#about-token .title-section", "top-to-bot opacity-1");
        addClassElement(
          "#about-token .about-token .content-about-token .info-content .item-1",
          "right-to-left-50vw opacity-1"
        );
        setTimeout(function () {
          addClassElement(
            "#about-token .about-token .content-about-token .info-content .item-2",
            "right-to-left-50vw opacity-1"
          );
        }, 500);
        setTimeout(function () {
          addClassElement(
            "#about-token .about-token .content-about-token .info-content .item-3",
            "right-to-left-50vw opacity-1"
          );
        }, 1000);
        setTimeout(function () {
          addClassElement(
            "#about-token .about-token .content-about-token .info-content .item-4",
            "right-to-left-50vw opacity-1"
          );
        }, 1500);
        setTimeout(function () {
          addClassElement(
            "#about-token .about-token .content-about-token .info-content .item-5",
            "right-to-left-50vw opacity-1"
          );
        }, 2000);
        setTimeout(function () {
          addClassElement(
            "#about-token .about-token .content-about-token .media-content",
            "right-to-left-50vw opacity-1"
          );
        }, 2500);
      }
    },
    [],
    sectionRef
  );
  return (
    <section id="about-token" ref={sectionRef}>
      <div className="container">
        <div className="about-token">
          <div className="title-section">
            <p className="title-top-section">{data.smallTitle}</p>
            <h2 className="title-bot-section">{data.title}</h2>
          </div>
          <div className="content-about-token">
            <div className="info-content">
              {data.data.map((item, index) => (
                <div className={`item-info item-${index + 1}`} key={index}>
                  <p className="desc-info">{item.title}</p>
                  <p className="text-info">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="media-content">
              <OptimizedImage
                img={data.chart}
                layout="intrinsic"
                lazy={false}
              />
              <OptimizedImage img={data.logo} layout="intrinsic" lazy={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicSection;
