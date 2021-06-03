import Section from "../sections";
import TeamProfile from "./team-profile";

const TeamSection = ({ data }) => {
  return (
    <Section
      className="mt-20 lg:mt-80"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="lg:grid lg:grid-cols-3 flex flex-col gap-6">
        {data.persons.map((person) => (
          <TeamProfile key={person.id} data={person} />
        ))}
      </div>
    </Section>
  );
};

export default TeamSection;
