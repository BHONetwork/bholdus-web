import Text from "../../common/text";
import Section from "../sections";

const TextSection = ({ data }) => {
  return (
    <Section
      id="about"
      className="mt-20 lg:mt-48 scroll-margin-top"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <Text type="p">{data.description}</Text>
    </Section>
  );
};

export default TextSection;