import useTranslation from "next-translate/useTranslation";

import Text from "../../common/text";

import { formatDate } from "../../../utils/datetime";

const Article = ({ data, index }) => {
  const { lang } = useTranslation();

  return (
    <div
      key={index}
      className="flex flex-col text-left p-10"
      style={{ background: "#252D4B" }}
      data-aos={"fade-left"}
      data-aos-delay={index * 200}
    >
      {data.topics?.length > 0 && (
        <Text className="mb-3" style={{ fontSize: 14 }}>
          {data.topics[0].topic}
        </Text>
      )}
      <Text className="mb-6" type="h4">
        {data.title}
      </Text>
      <Text className="mb-5" type="div">
        {data.description}
      </Text>
      <Text color="lightGrey" style={{ fontSize: 14 }} capitalized>
        {formatDate(lang, data.publishedAt)}
      </Text>
    </div>
  );
};

export default Article;
