import OptimizedImage from "../../common/optimized-image";
const TokenomicSection = ({ data }) => {
  return (
    <section id="about-token">
      <div className="container">
        <div className="about-token" data-aos="fade-down">
          <div className="title-section">
            <p className="title-top-section">{data.smallTitle}</p>
            <p className="title-bot-section">{data.title}</p>
          </div>
          <div className="content-about-token">
            <div className="info-content">
              {data.data.map((item, index) => (
                <div
                  className={`item-info item-${index + 1}`}
                  key={index}
                  data-aos="fade-left"
                  data-aos-delay={(index + 1) * 400}
                  data-aos-duration="1000"
                >
                  <p className="desc-info">{item.title}</p>
                  <p className="text-info">{item.value}</p>
                </div>
              ))}
            </div>
            <div
              className="media-content"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
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
