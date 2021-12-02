import OptimizedImage from "../../common/optimized-image";
import RichText from "../../common/rich-text";
import classNames from "classnames";
const ServiceSection = ({ data }) => {
  const renderTitle = (title) => {
    return <RichText children={title} />;
  };
  const renderContainer = (container, position, className = "") => {
    if (data?.services)
      return data.services.map((item, idx) => {
        if (item?.container === container)
          if (item.position === position)
            return (
              <div
                className={classNames("item-info", className)}
                key={idx}
                data-aos="fade-left"
                data-aos-delay={(idx + 1) * 400}
                data-aos-duration="1000"
              >
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
    <section id="mission">
      <div className="container">
        <div className="mission">
          <div
            className="title-section"
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            data-aos-delay={400}
            data-aos-duration="1000"
          >
            <p className="title-top-section">{data.smallTitle}</p>
            <p className="title-bot-section">{data.title}</p>
          </div>
          <div
            className="info-mission"
            id="info-mission"
            data-aos="fade-left"
            data-aos-easing="ease-in-sine"
          >
            <div className="left-info">
              <div className="top-left">{renderContainer("left", "top")}</div>
              <div className="bot-left">{renderContainer("left", "bot")}</div>
            </div>
            <div className="right-info">
              {renderContainer("right", "none", "right-to-left-2")}
            </div>
          </div>
          <div className="desc-mission">{data.description}</div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
