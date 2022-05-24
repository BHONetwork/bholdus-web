import OptimizedImage from "../../common/optimized-image";
// import RichText from "../../common/rich-text";
import classNames from "classnames";
import { useRef } from "react";
import { useScrollPosition, addClassElement } from "../../../utils/hooks";
const ServiceSection = ({ data }) => {
  const renderTitle = (title) => {
    /* NOTE: remove RichText because SEO optimize */
    // return <RichText children={title} />;
    return <h3 className="mission-item-title">{title}</h3>;
  };
  const sectionRef = useRef();
  let locked = false;
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < 520 && !locked) {
        locked = true;
        addClassElement(
          "#mission .mission .title-section",
          "left-to-right opacity-1"
        );
        addClassElement(
          "#mission .mission .info-mission .left-info .top-left",
          "right-to-left-2 opacity-1 item-1"
        );
        setTimeout(function () {
          addClassElement(
            "#mission .mission .info-mission .right-info .item-info:first-child",
            "right-to-left-2 opacity-1 item-2"
          );
        }, 500);
        setTimeout(function () {
          addClassElement(
            "#mission .mission .info-mission .left-info .bot-left .item-info:first-child",
            "right-to-left-2 opacity-1 item-3"
          );
        }, 1000);
        setTimeout(function () {
          addClassElement(
            "#mission .mission .info-mission .left-info .bot-left .item-info:last-child",
            "right-to-left-2 opacity-1 item-4"
          );
        }, 1500);
        setTimeout(function () {
          addClassElement(
            "#mission .mission .info-mission .right-info .item-info:last-child",
            "right-to-left-2 opacity-1 item-5"
          );
        }, 2000);
        setTimeout(function () {
          addClassElement(
            "#mission .mission .desc-mission",
            "opacity opacity-1"
          );
        }, 2500);
      }
    },
    [],
    sectionRef
  );

  const renderContainer = (container, position, className = "") => {
    if (data?.services)
      return data.services.map((item, idx) => {
        if (item?.container === container)
          if (item.position === position)
            return (
              <div className={classNames("item-info", className)} key={idx}>
                <OptimizedImage
                  img={item.image}
                  width={56}
                  height={56}
                  layout="intrinsic"
                />
                <span className="text-info">{renderTitle(item.title)}</span>
              </div>
            );
      });
    return null;
  };
  return (
    <section id="mission" ref={sectionRef}>
      <div className="container">
        <div className="mission">
          <div className="title-section">
            <p className="title-top-section">{data.smallTitle}</p>
            <h2 className="title-bot-section">{data.title}</h2>
          </div>
          <div className="info-mission" id="info-mission">
            <div className="left-info">
              <div className="top-left">{renderContainer("left", "top")}</div>
              <div className="bot-left">{renderContainer("left", "bot")}</div>
            </div>
            <div className="right-info">{renderContainer("right", "none")}</div>
          </div>
          <div className="desc-mission">{data.description}</div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
