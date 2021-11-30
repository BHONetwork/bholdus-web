import CustomLink from "../../common/custom-link";
import OptimizedImage from "../../common/optimized-image";

const LatestNewsSection = ({ data, articles }) => {
  if (articles.length > 0) {
    return (
      <section id="news">
        <div className="container">
          <div className="news">
            <div className="title-section">
              {data?.smallTitle && data.smallTitle !== " " ? (
                <p className="title-top-section">{data.smallTitle}</p>
              ) : null}
              <p className="title-bot-section">{data.title}</p>
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
                        {article.description}
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
                        {article.topics[0].topic}
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
