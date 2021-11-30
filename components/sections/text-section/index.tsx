import Section from "../sections";

const TextSection = ({ data }) => {
  return (
    <Section id="about" smallTitle={data.smallTitle} title={data.title}>
      <div className="container">
        <p data-aos="fade">{data.description}</p>
      </div>
    </Section>
  );
};

export default TextSection;
