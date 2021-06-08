import RichText from "../../common/rich-text";

const CollapsibleMarkdownContent = ({ accordion }) => {
  return <RichText children={accordion.content} />;
};

export default CollapsibleMarkdownContent;
