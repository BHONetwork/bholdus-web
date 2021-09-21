import Section from "../sections";
import Image from "../../common/image";
import OptimizedImage from "../../common/optimized-image";

const NotableStatisticsSection = ({ data }) => {
  if (data.imageBackground) {
    return (
      <Section
        id="notable-statistics"
        smallTitle={data.smallTitle}
        title={data.title}
        style={{ marginTop: "120px" }}
      >
        <Image className="image-bg" img={data.imageBackground} />
        <div className="notable-statistic-container container">
          <OptimizedImage
            className="image-content"
            data-aos="fade-up"
            data-aos-delay={400}
            img={data.imageContent}
          />
        </div>
      </Section>
    );
  }

  return null;
};

export default NotableStatisticsSection;
