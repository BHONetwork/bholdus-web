import Text from "../../common/text";

const Article = ({ data }) => {
  return (
    <div
      key={data.id}
      className="flex flex-col text-left p-10"
      style={{ background: "#252D4B" }}
    >
      <Text className="mb-3" size="smaller">
        {data.topics[0].topic}
      </Text>
      <Text className="mb-6" type="h4">
        {data.title}
      </Text>
      <Text className="mb-5" type="div">
        {data.description}
      </Text>
      <Text size="smaller" color="lightGrey">
        {data.publishedAt}
      </Text>
    </div>
  );
};

export default Article;
