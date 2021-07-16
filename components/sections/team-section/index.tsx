import Section from "../sections";
import TeamProfile from "./team-profile";
import Image from "../../common/image";

const TeamSection = ({ data }) => {
  const id = data.fixId ? data.fixId : `team-${data.id}`;
  return (
    <Section id={id} smallTitle={data.smallTitle} title={data.title}>
      <div className="team-container container">
        {data.persons.map((person: any, index: number) => (
          <TeamProfile key={person.id} data={person} index={index} />
        ))}
      </div>
      {data.imageBackground ? (
        <Image img={data.imageBackground} className="team-bg" />
      ) : null}
    </Section>
  );
};

export default TeamSection;
