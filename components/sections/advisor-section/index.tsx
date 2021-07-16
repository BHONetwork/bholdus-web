import Section from "../sections";
import BoardProfile from "./advisor-profile";
import Image from "../../common/image";

const AdvisorSection = ({ data }) => {
  const id = data.fixId ? data.fixId : `advisor-${data.id}`;
  return (
    <Section id={id} smallTitle={data.smallTitle} title={data.title}>
      <div className="advisor-container container">
        {data.persons.map((person: any, index: number) => (
          <BoardProfile key={person.id} data={person} index={index} />
        ))}
      </div>
      {data.imageBackground ? (
        <Image img={data.imageBackground} className="advisor-bg" />
      ) : null}
    </Section>
  );
};

export default AdvisorSection;
