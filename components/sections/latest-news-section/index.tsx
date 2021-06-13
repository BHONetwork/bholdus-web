import CustomLink from "../../common/custom-link";
import Section from "../sections";
import Article from "./article";
import Image from "../../common/image";

const LatestNewsSection = ({ data, articles }) => {
  if (articles.length > 0) {
    return (
      <Section id="news" smallTitle={data.smallTitle} title={data.title}>
        <div className="news-container container">
          {articles.map((article: any, index: number) => (
            <div className="article" key={index}>
              <CustomLink
                key={article.id}
                link={{ url: `/blog/article/${article.slug}` }}
              >
                <Article data={article} index={index} />
              </CustomLink>
            </div>
          ))}
        </div>
        {data.imageBackground ? (
          <Image img={data.imageBackground} className="news-bg" />
        ) : null}
      </Section>
    );
  }
  return null;
};

export default LatestNewsSection;
