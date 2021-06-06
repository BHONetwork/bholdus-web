import Lottie from "react-lottie";
import Button from "../common/button";
import Text from "../common/text";
import Bh from "../../assets/bh-symbol.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Bh,
};

const LandingPageHero = ({ data }) => {
  return (
    <section className="container flex flex-col-reverse md:flex-row justify-center landing-page-hero relative">
      {/* Left column for content */}
      <div
        className="flex flex-col justify-center items-start lg:ml-10"
        data-aos="fade-right"
      >
        <Text className="lg:mt-32 mb-2 xl:max-w-lg" type="h1">
          {data.title}
        </Text>

        <Text
          className="mt-2 lg:mt-9 mb-4 md:mb-16"
          type="p"
          style={{ maxWidth: 444 }}
        >
          {data.description}
        </Text>

        {/* Buttons row */}
        <div className="flex flex-row flex-wrap gap-4">
          {data.actions.map((button: any) => (
            <Button
              isLink
              key={button.id}
              buttonType={button.type}
              button={button}
            />
          ))}
        </div>
      </div>

      {/* Right column for the image */}
      <div className="flex flex-1 flex-row items-center" data-aos="fade-out">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </section>
  );
};

export default LandingPageHero;
