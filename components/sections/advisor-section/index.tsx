import Section from "../sections";
import BoardProfile from "./advisor-profile";

const AdvisorSection = ({ data }) => {
  return (
    <Section
      id="team"
      className="mt-20 lg:mt-80"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="lg:grid lg:grid-cols-2 lg:gap-6 flex flex-col lg:space-y-0 space-y-10">
        {data.persons.map((person: any) => (
          <BoardProfile key={person.id} data={person} />
        ))}
      </div>
    </Section>
  );
};

export default AdvisorSection;
