import Section from "../sections";
import TeamProfile from "./team-profile";

const TeamSection = ({ data }) => {
  return (
    <Section
      id={`team-${data.id}`}
      className="mt-20 lg:mt-40 scroll-margin-top"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="team-container">
        {data.persons.map((person: any, index: number) => (
          <TeamProfile key={person.id} data={person} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default TeamSection;
