import Section from "../sections";
import PressItem from "./press-item";
import Image from "../../common/image";

const PressSection = ({ data }) => {
  return (
    <Section id="press" smallTitle={data.smallTitle} title={data.title}>
      <div className="press-container container">
        {data.press.map((press: any, index: number) => (
          <PressItem key={press.id} data={press} index={index} />
        ))}
      </div>
      {data.imageBackground ? (
        <Image img={data.imageBackground} classWrapName="press-bg" />
      ) : null}
    </Section>
  );
};

export default PressSection;
