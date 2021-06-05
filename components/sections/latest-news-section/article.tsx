import Text from "../../common/text";

const Article = ({ data, index }) => {
  return (
    <div
      key={data.id}
      className="flex flex-col text-left p-10"
      style={{ background: "#252D4B" }}
      data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
      data-aos-delay={index * 200}
    >
      <Text className="mb-3" style={{ fontSize: 14 }}>
        {data.topics[0].topic}
      </Text>
      <Text className="mb-6" type="h4">
        {data.title}
      </Text>
      <Text className="mb-5" type="div">
        {data.description}
      </Text>
      <Text color="lightGrey" style={{ fontSize: 14 }}>
        {data.publishedAt}
      </Text>
    </div>
  );
};

export default Article;
