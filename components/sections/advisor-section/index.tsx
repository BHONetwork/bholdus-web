import Section from "../sections";
import BoardProfile from "./advisor-profile";

const AdvisorSection = ({ data }) => {
  return (
    <Section
      id="team"
      className="mt-20 lg:mt-40 scroll-margin-top"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10 lg:gap-16 mt-20">
        {data.persons.map((person: any, index: number) => (
          <BoardProfile key={person.id} data={person} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default AdvisorSection;
