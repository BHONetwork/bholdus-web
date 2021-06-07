import Button from "../common/button";
import Text from "../common/text";
import Image from "../common/image";
const LandingPageHero = ({ data }) => {
  const background = data.videoBackground.Enable ? (
    <div className="bg-hero-video">
      <video
        src={data.videoBackground.video_url.url}
        autoPlay={true}
        muted={true}
        loop={true}
      />
    </div>
  ) : (
    <div className="bg-hero-image">
      <Image img={data.imageBackground} />
    </div>
  );
  return (
    <div className="relative z-2 min-h-screen flex-col flex">
      {background}
      <section className="container hero">
        <div className="hero-logo">
          <Image img={data.image} data-aos="fade" />
        </div>

        <div
          className="hero-content"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
        >
          <Text className="hero-title" type="h1">
            {data.title}
          </Text>

          <Text className="hero-description" type="p">
            {data.description}
          </Text>

          {/* Buttons row */}
          <div className="flex flex-row flex-wrap">
            {data.actions.map((button: any) => (
              <Button
                className="mr-2 mb-2"
                isLink
                key={button.id}
                buttonType={button.type}
                button={button}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageHero;
