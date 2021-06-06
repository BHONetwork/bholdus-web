import { useState } from "react";

import { styled } from "../../assets/css/stitches.config";

import Text from "../common/text";
import VideoModal from "../elements/video-modal";

const PlayButton = ({ onClick }) => {
  return (
    <div className="play-button">
      <button onClick={onClick}>
        <img src="../../images/play_btn.png" alt="play-button" />
      </button>
    </div>
  );
};

const GreenBackground = styled("div", {
  background: "$green",
});

const Introduction = ({ data }) => {
  const [displayIntroductionVideo, setDisplayIntroductionVideo] =
    useState(false);

  return (
    <section className="flex flex-col lg:flex-row justify-end flex-shrink">
      <div
        className="lg:relative flex justify-center items-center max-h-min lg:mb-0 -mb-16 z-10"
        style={{ maxHeight: 205 }}
      >
        {data.introductionVideoLink && (
          <PlayButton onClick={() => setDisplayIntroductionVideo(true)} />
        )}
      </div>
      <GreenBackground className="max-w-4xl p-10 md:pt-20 md:pb-20 md:pr-24 md:pl-28">
        <div className="flex flex-row items-center mb-12">
          <div
            className="mr-2"
            style={{ backgroundColor: "white", width: 40, height: 1 }}
          />
          <Text size="small" weight="bold">
            INTRODUCTION
          </Text>
        </div>
        <Text className="mb-10" type="h2">
          {data.title}
        </Text>
        <Text className="mb-10" type="p">
          {data.description}
        </Text>
        <ul className="pl-6">
          {data.featuredPoints.map((point: any) => (
            <li className="flex flex-row" key={point.id}>
              <div className="mr-2" style={{ color: "white" }}>
                •
              </div>
              <Text type="p">{point.content}</Text>
            </li>
          ))}
        </ul>
      </GreenBackground>
      {data.introductionVideoLink && (
        <VideoModal
          isShown={displayIntroductionVideo}
          closeSelf={() => setDisplayIntroductionVideo(false)}
          src={data.introductionVideoLink}
        />
      )}
    </section>
  );
};

export default Introduction;
