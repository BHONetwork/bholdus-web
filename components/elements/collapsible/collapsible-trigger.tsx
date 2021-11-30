import { MdKeyboardArrowRight } from "react-icons/md";

const CollapsibleTrigger = ({ accordion }) => {
  return (
    <div className="collapsible_trigger">
      <div className="collapsible_trigger__left_col">
        <Text size="medium" color="black" weight="bold">
          {accordion.title}
        </Text>
        <Text size="medium" color="red">
          {accordion.description}
        </Text>
      </div>
      <MdKeyboardArrowRight className="trigger-icon" size={25} />
    </div>
  );
};

export default CollapsibleTrigger;
