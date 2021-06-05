import Text from "../../common/text";
import classNames from "classnames";

const RoadmapItem = ({ data, isLastItem }) => {
  return (
    <div
      className={classNames("road__item", {
        "road__item-active": data.status === "current",
        "road__item-finish": data.status === "finished",
        "road__item-next": data.status === "pending",
      })}
      key={data.id}
    >
      <div className="road__item-metka"></div>
      <div className="road__item-content">
        <div className="road__item-title">{data.date}</div>
        <Text type="p">{data.content}</Text>
      </div>
    </div>
  );
};

export default RoadmapItem;
