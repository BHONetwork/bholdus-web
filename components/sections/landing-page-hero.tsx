import Button from "../common/button";
import RichText from "../common/rich-text";

const LandingPageHero = ({ data }) => {
  return (
    <section id="banner-home">
      <div className="banner-background">
        <section id="main-background">
          <div className="video">
            <video
              width="1920"
              height="900"
              className="lazy"
              preload={"yes"}
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
            >
              <source
                src="https://cdn.bholdus.com/bholdus-web/bg2_618268dd31.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="video-mobi">
            <video
              width="100%"
              height="500"
              className="lazy"
              preload={"yes"}
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
            >
              <source
                src="https://cdn.bholdus.com/bholdus-web/bgmobi2_2f635bc1e5.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="gradient-bot"></div>
        </section>
        <section id="background-2">
          <div className="gradient"></div>
          <div className="img-bg"></div>
          <div className="gradient-top"></div>
          <div className="gradient-bot"></div>
        </section>
        <section id="background-3">
          <div className="gradient"></div>
          <div className="img-bg"></div>
          <div className="gradient-top"></div>
          <div className="gradient-bot"></div>
        </section>
        <section id="background-4">
          <div className="gradient"></div>
          <div className="img-bg"></div>
          <div className="gradient-top"></div>
        </section>
      </div>
      <div className="container">
        <div className="banner-home">
          <div className="wrap-banner">
            <div className="title-banner title-section">
              <RichText children={data.title} />
            </div>
            <div className="desc-banner">
              <RichText children={data.description} />
            </div>
            <div className="button-banner">
              {data.actions.map((button: any) => (
                <Button
                  className="button-item"
                  isLink
                  key={button.id}
                  buttonType={button.type}
                  button={button}
                />
              ))}
              <a href="#" className="button-item">
                BUY BHO NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageHero;
