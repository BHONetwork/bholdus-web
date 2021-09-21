import Section from "../sections";
import OptimizedImage from "../../common/optimized-image";

const AboutTokenSection = ({ data }) => {
  if (data.imageBackground) {
    return (
      <Section
        id="about-token"
        smallTitle={data.smallTitle}
        title={data.title}
        style={{ marginTop: "120px" }}
      >
        <div className="about-token-container container">
          <OptimizedImage
            data-aos="fade-up"
            data-aos-delay={400}
            img={data.imageBackground}
            height={data.imageBackground.height}
            width={data.imageBackground.width}
          />
        </div>
      </Section>
    );
  }

  return null;
};

export default AboutTokenSection;
