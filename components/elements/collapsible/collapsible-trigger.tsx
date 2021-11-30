import { MdKeyboardArrowRight } from "react-icons/md";

const CollapsibleTrigger = ({ accordion }) => {
  return (
    <div className="collapsible_trigger">
      <div className="collapsible_trigger__left_col">
        <p color="black">{accordion.title}</p>
        <p color="red">{accordion.description}</p>
      </div>
      <MdKeyboardArrowRight className="trigger-icon" size={25} />
    </div>
  );
};

export default CollapsibleTrigger;
