import useTranslation from "next-translate/useTranslation";

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

const Introduction = ({ data, setDisplayVideo }) => {
  const { t } = useTranslation();

  return (
    <>
      <section id="intro">
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
                <PlayButton
                  onClick={() => {
                    setDisplayVideo(true);
                  }}
                />
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
      </section>
    </>
  );
};

export default Introduction;
