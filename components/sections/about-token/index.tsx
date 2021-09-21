import Section from "../sections";
import OptimizedImage from "../../common/optimized-image";
import Button from "../../common/button";

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
          <Button
            className="mt-12 inline-block"
            isLink
            buttonType="orange"
            button={{
              text: "Buy Tokens",
              url: "https://sale.bholdus.com/",
              newTab: true,
            }}
          />
        </div>
      </Section>
    );
  }

  return null;
};

export default AboutTokenSection;
