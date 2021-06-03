import Section from "../sections";
import Article from "./article";

const LatestNewsSection = ({ articles }) => {
  if (articles.length > 0) {
    return (
      <Section
        className="mt-20 lg:mt-80"
        smallTitle="In the world"
        title="Latest News"
      >
        <div className="lg:grid lg:grid-cols-3 flex flex-col gap-6">
          {articles.map((article: any) => (
            <Article data={article} />
          ))}
        </div>
      </Section>
    );
  }
  return null;
};

export default LatestNewsSection;
