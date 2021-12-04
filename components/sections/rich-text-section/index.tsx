import RichText from "../../common/rich-text";

const RichTextSection = ({ data }) => {
  return (
    <section id="page-content">
      <RichText children={data.content} className="container" />
    </section>
  );
};

export default RichTextSection;
