import TeamProfile from "./team-profile";
import Image from "../../common/image";

const TeamSection = ({ data }) => {
  const id = data.fixId ? data.fixId : `team-${data.id}`;
  return (
    <section id={id}>
      <div className="container">
        <div className="our-brain">
          <div className="title-section" data-aos="fade-down">
            {data?.smallTitle && data.smallTitle !== " " ? (
              <p className="title-top-section">{data.smallTitle}</p>
            ) : null}

            <p className="title-bot-section">{data.title}</p>
          </div>
          <div className="list-our-brain">
            {data.persons.map((person: any, index: number) => (
              <TeamProfile key={person.id} data={person} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
