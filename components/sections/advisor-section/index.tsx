import Section from "../sections";
import BoardProfile from "./advisor-profile";

const AdvisorSection = ({ data }) => {
  return (
    <Section
      className="mt-20 lg:mt-80"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="lg:grid lg:grid-cols-2 gap-6 flex flex-col">
        {data.persons.map((person) => (
          <BoardProfile data={person} />
        ))}
      </div>
    </Section>
  );
};

export default AdvisorSection;
