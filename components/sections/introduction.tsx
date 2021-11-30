import { useState } from "react";
import useTranslation from "next-translate/useTranslation";

import VideoModal from "../elements/video-modal";
import OptimizedImage from "../common/optimized-image";

const PlayButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <OptimizedImage
        img={{
          url: "/images/media_play.svg",
          alternativeText: "play-button",
        }}
        className="play-button"
        lazy={false}
      />
    </button>
  );
};

const Introduction = ({ data }) => {
  const [displayIntroductionVideo, setDisplayIntroductionVideo] =
    useState(false);

  const { t } = useTranslation();

  return (
    <>
      <section id="intro" data-aos="fade-up" data-aos-delay={400}>
        <div className="intro">
          <div className="media-intro">
            <OptimizedImage
              img={{
                url: "/images/media-intro.webp",
                alternativeText: "bholdus",
              }}
              lazy={true}
            />
            {data.introductionVideoLink && (
              <>
                <PlayButton onClick={() => setDisplayIntroductionVideo(true)} />
                <div className="circle"></div>
                <div className="circle-ani delay-2"></div>
                <div className="circle-ani delay-0"></div>
              </>
            )}
          </div>
          <div className="info-intro">
            <div className="title-info title-section">
              <p className="title-top title-top-section">
                {t("common:introduction")}
              </p>
              <p className="title-bot title-bot-section">{data.title}</p>
            </div>
            <p className="desc-info">{data.description}</p>
            <ul className="list-info">
              {data.featuredPoints.map((point: any) => (
                <li className="item-info" key={point.id}>
                  {point.content}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* {data.imageBackground ? (
          <Image img={data.imageBackground} className="introduction-bg" />
        ) : null} */}
      </section>
      {data.introductionVideoLink && (
        <VideoModal
          isShown={displayIntroductionVideo}
          closeSelf={() => setDisplayIntroductionVideo(false)}
          src={data.introductionVideoLink}
        />
      )}
    </>
  );
};

export default Introduction;
