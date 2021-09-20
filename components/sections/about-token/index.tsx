import Section from "../sections";
import Image from "../../common/image";

const AboutTokenSection = ({ data }) => {
  if (data.imageBackground) {
    return (
      <Section
        id="about-token"
        smallTitle={data.smallTitle}
        title={data.title}
        style={{ marginTop: "120px" }}
      >
        <Image img={data.imageBackground} />
      </Section>
    );
  }

  return null;
};

export default AboutTokenSection;
