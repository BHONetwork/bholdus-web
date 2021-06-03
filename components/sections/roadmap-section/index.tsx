import Section from "../sections";
import RoadmapItem from "./roadmap-item";

const RoadmapSection = ({ data }) => {
  return (
    <Section
      className="mt-20 lg:mt-80 items-center"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      {data.roadMapItems.map((item: any, index: number) => (
        <RoadmapItem
          key={item.id}
          data={item}
          isLastItem={index === data.roadMapItems.length - 1}
        />
      ))}
    </Section>
  );
};

export default RoadmapSection;
