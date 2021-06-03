import Text from "../common/text";
import Section from "./sections";

const TextSection = ({ data }) => {
  return (
    <Section
      className="mt-20 lg:mt-48"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <Text type="p">{data.description}</Text>
    </Section>
  );
};

export default TextSection;
