import Section from "../sections";
import TeamProfile from "./team-profile";

const TeamSection = ({ data }) => {
  return (
    <Section
      className="mt-20 lg:mt-80 scroll-margin-top"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="md:grid lg:grid-cols-3  md:grid-cols-2 lg:gap-6 md:gap-4 flex flex-col md:space-y-0 space-y-10">
        {data.persons.map((person: any, index: number) => (
          <TeamProfile key={person.id} data={person} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default TeamSection;
