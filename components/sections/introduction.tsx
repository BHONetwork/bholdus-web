import classNames from "classnames";
import { styled } from "../../assets/css/stitches.config";
import Text from "../common/text";

const PlayButton = ({ className = "", style = {} }) => {
  return (
    <div
      className={classNames("relative", className)}
      style={{ width: 205, height: 205, ...style }}
    >
      <img
        className="absolute inset-1/3"
        src="../../images/play_btn.png"
        alt=""
        style={{ width: 69, height: 69 }}
      ></img>
      <img
        className="absolute"
        src="../../images/play_btn_bg.png"
        alt=""
        style={{ width: 205, height: 205 }}
      ></img>
    </div>
  );
};

const GreenBackground = styled("div", {
  background: "$green",
});

const Introduction = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-end">
      <PlayButton className="self-start play-button" />
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
    </div>
  );
};

export default Introduction;
