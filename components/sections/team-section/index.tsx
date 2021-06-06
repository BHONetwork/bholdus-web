import Section from "../sections";
import TeamProfile from "./team-profile";

const TeamSection = ({ data }) => {
  return (
    <Section
      className="mt-20 lg:mt-40 scroll-margin-top"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gril-cols-6">
        {data.persons.map((person: any, index: number) => (
          <TeamProfile key={person.id} data={person} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default TeamSection;
