import Text from "../../common/text";
import classNames from "classnames";

const RoadmapItem = ({ data, isLastItem }) => {
  console.log(data);
  let content = data.content.split("\n").map((line) => <p>{line}</p>);
  console.log(content);
  return (
    <div
      className={classNames("road__item", {
        "road__item-active": data.status === "current",
        "road__item-finish": data.status === "finished",
        "road__item-next": data.status === "pending",
      })}
      key={data.id}
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="1000"
    >
      <div className="road__item-metka"></div>
      <div className="road__item-content">
        <div className="road__item-title">{data.date}</div>
        {content}
      </div>
    </div>
  );
};

export default RoadmapItem;
