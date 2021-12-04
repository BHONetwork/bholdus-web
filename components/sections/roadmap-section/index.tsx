import { useEffect, useRef } from "react";
import classNames from "classnames";
import { useWindowSize } from "../../../utils/hooks";
import OptimizedImage from "../../common/optimized-image";
import { useScrollPosition, addClassElement } from "../../../utils/hooks";
import useTranslation from "next-translate/useTranslation";

const RoadmapSection = ({ data }) => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  let locked1 = false;
  let locked2 = false;
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < 760 && !locked1) {
        locked1 = true;
        addClassElement("#roadmap .title-section", "top-to-bot opacity-1");
        addClassElement(
          "#roadmap .roadmap .calendar-roadmap",
          "opacity opacity-1"
        );
      }
      if (currPos.y < -40 && !locked2) {
        locked2 = true;
        addClassElement(
          "#roadmap .roadmap .info-roadmap .item1",
          "bot-to-top-2 opacity-1"
        );
        setTimeout(function () {
          addClassElement(
            "#roadmap .roadmap .info-roadmap .item2",
            "bot-to-top-2 opacity-1"
          );
        }, 500);
        setTimeout(function () {
          addClassElement(
            "#roadmap .roadmap .info-roadmap .item3",
            "bot-to-top-2 opacity-1"
          );
        }, 1000);
        setTimeout(function () {
          addClassElement(
            "#roadmap .roadmap .info-roadmap .item4",
            "bot-to-top-2 opacity-1"
          );
        }, 1500);
        addClassElement(
          "#roadmap .roadmap .info-roadmap .img-info",
          "top-to-bot"
        );
      }
    },
    [],
    sectionRef
  );

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
    <section id="roadmap" ref={sectionRef}>
      <div className="roadmap">
        <div className="title-section">
          <p className="title-top-section">{data.smallTitle}</p>
          <p className="title-bot-section">{data.title}</p>
        </div>
        <div className="calendar-roadmap">
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
          <div className="item-info item1">
            <p className="title-item">{t("roadmap:members")}</p>
            <p className="number-item">70.000</p>
          </div>
          <div className="item-info item2">
            <p className="title-item">{t("roadmap:discussions")}</p>
            <p className="number-item">1.000.000</p>
          </div>
          <div className="item-info item3">
            <p className="title-item">{t("roadmap:impressions")}</p>
            <p className="number-item">5.000.000</p>
          </div>
          <div className="item-info item4">
            <p className="title-item">{t("roadmap:registrations")}</p>
            <p className="number-item">30.000</p>
          </div>
          <div className="img-info">
            <OptimizedImage
              img={{
                url: "/images/img-bot-roadmap.webp",
                alternativeText: "bholdus",
              }}
              lazy={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
