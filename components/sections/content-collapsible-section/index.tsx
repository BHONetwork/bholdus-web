import CollapsibleAccordion from "../../elements/collapsible";

const ContentCollapsibleSection = ({ data }) => {
  return <CollapsibleAccordion accordions={data.collapsibleItems} />;
};

export default ContentCollapsibleSection;
