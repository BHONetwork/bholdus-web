import RichText from "../../common/rich-text";

const RichTextSection = ({ data }) => {
  return <RichText children={data.content} />;
};

export default RichTextSection;
