import useTranslation from "next-translate/useTranslation";
import Section from "../sections";
import OptimizedImage from "../../common/optimized-image";
import Button from "../../common/button";

const AboutTokenSection = ({ data }) => {
  const { t } = useTranslation();

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
            className="mt-12 inline-block capitalize"
            isLink
            buttonType="orange"
            button={{
              text: `${t("common:buy")} Tokens`,
              url: "https://pancakeswap.finance/swap?outputCurrency=0x8717e80eff08f53a45b4a925009957e14860a8a8",
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
