import Section from "../sections";
import BoardProfile from "./advisor-profile";

const AdvisorSection = ({ data }) => {
  return (
    <Section
      id={`advisor-${data.id}`}
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="advisor-container">
        {data.persons.map((person: any, index: number) => (
          <BoardProfile key={person.id} data={person} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default AdvisorSection;
