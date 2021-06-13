import RichText from "../../common/rich-text";

const RichTextSection = ({ data }) => {
  return <RichText children={data.content} className="container" />;
};

export default RichTextSection;
