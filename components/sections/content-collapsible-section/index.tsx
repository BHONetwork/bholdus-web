import CollapsibleAccordion from "../../elements/collapsible";

const ContentCollapsibleSection = ({ data }) => {
  return (
    <CollapsibleAccordion
      className="container"
      accordions={data.collapsibleItems}
    />
  );
};

export default ContentCollapsibleSection;
