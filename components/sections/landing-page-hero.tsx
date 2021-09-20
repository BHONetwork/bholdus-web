import { useState } from "react";

import Button from "../common/button";
import Text from "../common/text";
import Image from "../common/image";
import OptimizedImage from "../common/optimized-image";

import { useInterval } from "../../utils/hooks";
import { catZeroCharString, convertTimeToDHMS } from "../../utils/others";

const CountDownPublicListing = () => {
  // NOTE: time to target countdown to seconds
  const [timeToTarget, setTimeToTarget] = useState(
    (new Date("09/25/2021").getTime() - new Date().getTime()) / 1000
  );

  useInterval(
    () => {
      setTimeToTarget(timeToTarget - 1);
    },
    timeToTarget > 0 ? 1000 : null
  );

  const renderBlocks = () => {
    const durationData = convertTimeToDHMS(timeToTarget);
    const renderData = [];
    Object.keys(durationData).forEach((timeLabel) =>
      renderData.push({
        timeValue: catZeroCharString(durationData[timeLabel]),
        timeLabel,
      })
    );

    return renderData.map((timeItem) => {
      const { timeLabel, timeValue } = timeItem;
      return (
        <div key={`count-down-block-${timeLabel}`} className="count-down-block">
          <div className={`count-down-number-group ${timeLabel}`}>
            <div className="count-down-number-item">{timeValue[0]}</div>
            <div className="count-down-number-item">{timeValue[1]}</div>
          </div>
          <Text className="count-down-group-label" type="p" uppercase>
            {timeLabel}
          </Text>
        </div>
      );
    });
  };

  return (
    <div className="count-down-wrapper">
      <Text className="count-down-title" type="p" size="small">
        {timeToTarget > 0 ? "Public Listing in" : "Open for Public Listing"}
      </Text>
      <div className="count-down-blocks">{renderBlocks()}</div>
    </div>
  );
};

const LandingPageHero = ({ data }) => {
  const video_url = data.videoBackground?.video_url?.url
    ? data.videoBackground.video_url.url.replace(
        "bholdus.s3.ap-southeast-1.amazonaws.com",
        "cdn.bholdus.com"
      )
    : null;

  const background =
    data?.videoBackground?.enable && video_url ? (
      <div className="bg-hero-video">
        <video
          className="lazy"
          preload={"yes"}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
        >
          <source src={video_url} type="video/mp4" />
        </video>
      </div>
    ) : (
      <div className="bg-hero-image">
        <Image img={data.imageBackground} lazy={false} />
      </div>
    );

  return (
    <section className="relative z-2 min-h-screen flex-col flex">
      {background}
      <div id="hero" className="container">
        {data?.videoBackground?.enable && (
          <div className="hero-logo">
            <OptimizedImage
              img={data.image}
              data-aos="fade"
              width={150}
              height={150}
            />
          </div>
        )}

        <div className="hero-content">
          <Text className="hero-title" type="h1">
            {data.title}
          </Text>

          <Text className="hero-description" type="p">
            {data.description}
          </Text>

          <CountDownPublicListing />

          {/* Buttons row */}
          <div className="hero-button">
            {data.actions.map((button: any) => (
              <Button
                className={`button${button.type ? "" : " button-special"}`}
                isLink
                key={button.id}
                buttonType={button.type}
                button={button}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageHero;
