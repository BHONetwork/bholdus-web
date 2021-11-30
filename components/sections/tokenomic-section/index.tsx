import OptimizedImage from "../../common/optimized-image";
import classNames from "classnames";
const TokenomicSection = ({ data }) => {
  const renderContainer = (container, position, className = "") => {
    if (data?.services)
      return data.services.map((item, idx) => {
        if (item?.container === container)
          if (item.position === position)
            return (
              <div className={classNames("item-info", className)} key={idx}>
                <OptimizedImage
                  img={item.image}
                  width={56}
                  height={56}
                  layout="intrinsic"
                />
                <span className="text-info">{renderTitle(item.title)}</span>
              </div>
            );
      });
    return null;
  };
  return (
    <section id="about-token" data-aos="fade-up" data-aos-delay={200}>
      <div className="container">
        <div className="about-token">
          <div className="title-section">
            <p className="title-top-section">{data.smallTitle}</p>
            <p className="title-bot-section">{data.title}</p>
          </div>
          <div className="content-about-token">
            <div className="info-content">
              {data.data.map((item, index) => (
                <div className={`item-info item-${index + 1}`} key={index}>
                  <p className="desc-info">{item.title}</p>
                  <p className="text-info">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="media-content">
              <OptimizedImage
                img={data.chart}
                layout="intrinsic"
                lazy={false}
              />
              <OptimizedImage img={data.logo} layout="intrinsic" lazy={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicSection;
