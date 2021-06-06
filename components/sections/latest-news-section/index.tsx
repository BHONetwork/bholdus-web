import CustomLink from "../../common/custom-link";
import Section from "../sections";
import Article from "./article";

const LatestNewsSection = ({ articles }) => {
  if (articles.length > 0) {
    return (
      <Section
        className="mt-20 lg:mt-80 scroll-margin-top"
        smallTitle="In the world"
        title="Latest News"
      >
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 flex flex-col lg:space-y-0 space-y-10">
          {articles.map((article: any, index: number) => (
            <CustomLink
              key={article.id}
              link={{ url: `/blog/article/${article.slug}` }}
            >
              <Article data={article} index={index} />
            </CustomLink>
          ))}
        </div>
      </Section>
    );
  }
  return null;
};

export default LatestNewsSection;
