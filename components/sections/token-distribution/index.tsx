import Section from "../sections";
import Image from "../../common/image";

const TokenDistributionSection = ({ data }) => {
  if (data.imageBackground) {
    return (
      <Section
        id="token-distribution"
        smallTitle={data.smallTitle}
        title={data.title}
        style={{ marginTop: "120px" }}
      >
        <div className="token-distribution-container container">
          <Image img={data.imageBackground} />
        </div>
      </Section>
    );
  }

  return null;
};

export default TokenDistributionSection;
