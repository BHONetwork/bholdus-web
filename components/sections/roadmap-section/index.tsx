import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useWindowSize } from "../../../utils/hooks";
import OptimizedImage from "../../common/optimized-image";

const RoadmapSection = ({ data }) => {
  const listMonthRef = useRef(null);
  const windowSize = useWindowSize();
  let xLeft,
    xStep = 0;
  const indexCurrent = data?.roadMapItems.findIndex(
    (item) => item.status === "current"
  );
  // calculate the center point
  const centerPoint = Math.round(data?.roadMapItems.length / 2);

  useEffect(() => {
    if (windowSize?.width > 1365) xStep = 226;
    if (windowSize?.width < 1365) xStep = 209;
    if (windowSize?.width < 1279) xStep = 169;
    if (windowSize?.width < 1023) xStep = 184;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    xLeft = (centerPoint - indexCurrent - 1) * xStep;
    listMonthRef.current.style = `left: ${xLeft}px;`;
  }, [windowSize]);

  // get the Index of current

  const onPrev = () => {
    if (xLeft !== xStep * (centerPoint - 2)) xLeft += xStep;
    listMonthRef.current.style = `left: ${xLeft}px;`;
  };
  const onNext = () => {
    if (xLeft !== -(xStep * (centerPoint - 2))) xLeft -= xStep;
    listMonthRef.current.style = `left: ${xLeft}px;`;
  };
  const renderItem = (item) => {
    let content = item.content.split("\n").map((line, index) => (
      <li className="item-info-month" key={index}>
        {line}
      </li>
    ));
    return content;
  };
  return (
    <section id="roadmap">
      <div
        className="roadmap"
        data-aos="fade-down"
        data-aos-delay={400}
        data-aos-duration={1000}
      >
        <div className="title-section">
          <p className="title-top-section">{data.smallTitle}</p>
          <p className="title-bot-section">{data.title}</p>
        </div>
        <div
          className="calendar-roadmap opacity opacity-1"
          data-aos="fade-up"
          data-aos-delay={1000}
        >
          <div className="list-month" ref={listMonthRef}>
            {data.roadMapItems.map((item: any, index: number) => (
              <div className="item-month" key={item.id}>
                <p className="title-month">{item.date}</p>
                <ul
                  className={classNames("list-info-month", {
                    dot: item.status === "current",
                  })}
                >
                  {renderItem(item)}
                  <span
                    className={classNames("item-dot", {
                      "dot-active": item.status === "current",
                      "dot-color": item.status === "pending",
                    })}
                  ></span>
                  {index < indexCurrent - 2 ? (
                    <span className="item-line"></span>
                  ) : null}
                </ul>
              </div>
            ))}
          </div>
          <div className="line-month"></div>
          <div className="owl-nav">
            <button className="prev" onClick={onPrev}>
              <span>
                <OptimizedImage
                  img={{
                    url: "/images/preview.svg",
                    alternativeText: "bholdus",
                  }}
                  lazy={true}
                />
              </span>
            </button>
            <button className="next" onClick={onNext}>
              <span>
                <OptimizedImage
                  img={{
                    url: "/images/next.svg",
                    alternativeText: "bholdus",
                  }}
                  lazy={true}
                />
              </span>
            </button>
          </div>
        </div>
        <div className="info-roadmap">
          <div
            className="item-info item1"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            <p className="title-item">Worldwide Community Memners</p>
            <p className="number-item">70.000</p>
          </div>
          <div
            className="item-info item2"
            data-aos="fade-up"
            data-aos-delay={800}
          >
            <p className="title-item">Social Discussions</p>
            <p className="number-item">1.000.000</p>
          </div>
          <div
            className="item-info item3"
            data-aos="fade-up"
            data-aos-delay={1200}
          >
            <p className="title-item">Impression</p>
            <p className="number-item">5.000.000</p>
          </div>
          <div
            className="item-info item4"
            data-aos="fade-up"
            data-aos-delay={1600}
          >
            <p className="title-item">Registrations</p>
            <p className="number-item">30.000</p>
          </div>
          <div className="img-info">
            <OptimizedImage
              img={{
                url: "/images/img-bot-roadmap.webp",
                alternativeText: "bholdus",
              }}
              lazy={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
