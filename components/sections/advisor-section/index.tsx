import BoardProfile from "./advisor-profile";

const AdvisorSection = ({ data }) => {
  const id = data.fixId ? data.fixId : `advisor-${data.id}`;
  return (
    <section id={id}>
      <div className="container">
        <div className="our-board">
          <div className="title-section">
            {data?.smallTitle && data.smallTitle !== " " ? (
              <p className="title-top-section">{data.smallTitle}</p>
            ) : null}
            <p className="title-bot-section">{data.title}</p>
          </div>
          <div className="list-our-board">
            {data.persons.map((person: any, index: number) => (
              <BoardProfile key={person.id} data={person} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorSection;
