import Section from "../sections";
import RoadmapItem from "./roadmap-item";
import Image from "../../common/image";

const RoadmapSection = ({ data }) => {
  return (
    <Section id="roadmap" smallTitle={data.smallTitle} title={data.title}>
      <div className="road-container">
        <div className="road container">
          {data.roadMapItems.map((item: any, index: number) => (
            <RoadmapItem
              key={item.id}
              data={item}
              isLastItem={index === data.roadMapItems.length - 1}
            />
          ))}
        </div>
      </div>
      {data.imageBackground ? (
        <Image img={data.imageBackground} classWrapName="road-bg" />
      ) : null}
    </Section>
  );
};

export default RoadmapSection;
