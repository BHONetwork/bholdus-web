import Text from "../../common/text";
import Section from "../sections";

const TextSection = ({ data }) => {
  return (
    <Section id="about" smallTitle={data.smallTitle} title={data.title}>
      <div className="container">
        <Text type="p" data-aos="fade">
          {data.description}
        </Text>
      </div>
    </Section>
  );
};

export default TextSection;
