import { useRef } from "react";
import { addClassElement, useScrollPosition } from "../../../utils/hooks";
import CustomLink from "../../common/custom-link";
import OptimizedImage from "../../common/optimized-image";

const LatestNewsSection = ({ data, articles }) => {
  console.log(articles);
  const sectionRef = useRef(null);
  let locked = false;
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < 650 && !locked) {
        locked = true;
        addClassElement("#news .title-section", "top-to-bot opacity-1");
        addClassElement("#news .news .list-news", "bot-to-top");
      }
    },
    [],
    sectionRef
  );
  if (articles.length > 0) {
    return (
      <section id="news" ref={sectionRef}>
        <div className="container">
          <div className="news">
            <div className="title-section">
              {data?.smallTitle && data.smallTitle !== " " ? (
                <p className="title-top-section">{data.smallTitle}</p>
              ) : null}
              <h2 className="title-bot-section">{data.title}</h2>
            </div>
            <div className="list-news">
              {articles.map((article: any, index: number) => (
                <div className="item-news" key={index}>
                  <div className="wrap-img">
                    <OptimizedImage
                      img={article.image}
                      layout="intrinsic"
                      lazy={true}
                    />
                  </div>
                  <div className="wrap-text">
                    <div className="title-item">
                      <CustomLink
                        key={article.id}
                        link={{ url: `/blog/article/${article.slug}` }}
                      >
                        <h3 className="latest-news-title">
                          {article.description}
                        </h3>
                      </CustomLink>
                    </div>
                    <p className="desc-item">
                      <span className="date">
                        {new Date(article.publishedAt)
                          .toISOString()
                          .slice(0, 10)}
                      </span>
                      <span className="dot">|</span>
                      <span className="category">
                        {article?.topics[0]?.topic}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default LatestNewsSection;
