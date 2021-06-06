import { useEffect } from "react";
import lottie from "lottie-web";

import Button from "../common/button";
import Text from "../common/text";

const LandingPageHero = ({ data }) => {
  useEffect(() => {
    const blackhole = lottie.loadAnimation({
      container: document.getElementById("blackhole"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "../../images/bh-symbol.json",
    });
    return () => blackhole.destroy();
  }, []);

  return (
    <main className="container flex flex-col md:flex-row justify-between items-center md:mt-28 mt-16">
      {/* Left column for content */}
      <div className="flex-1 sm:pr-8" data-aos="fade-right">
        <Text className="mb-2 xl:max-w-lg" type="h1">
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

      {/* Right column for the image */}
      <div
        id="blackhole"
        className="hidden md:block h-2/5 w-2/5"
        // data-aos="fade-up"
      />
    </main>
  );
};

export default LandingPageHero;
