import Section from "../sections";
import RoadmapItem from "./roadmap-item";

const RoadmapSection = ({ data }) => {
  return (
    <Section id="roadmap" smallTitle={data.smallTitle} title={data.title}>
      <div className="road">
        {data.roadMapItems.map((item: any, index: number) => (
          <RoadmapItem
            key={item.id}
            data={item}
            isLastItem={index === data.roadMapItems.length - 1}
          />
        ))}
      </div>
    </Section>
  );
};

export default RoadmapSection;
