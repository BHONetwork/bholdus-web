import PressItem from "./press-item";

const PressSection = ({ data }) => {
  return (
    <section id="in-press">
      <div className="container">
        <div className="in-press">
          <div className="in-press">
            <div className="title-section">
              {data?.smallTitle && data.smallTitle !== " " ? (
                <p className="title-top-section">{data.smallTitle}</p>
              ) : null}

              <p className="title-bot-section">{data.title}</p>
            </div>
            <div className="list-in-press">
              {data.press.map((press: any, index: number) => (
                <PressItem key={press.id} data={press} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
