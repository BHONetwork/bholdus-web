import Button from "../common/button";
import Image from "../elements/image";
import Text from "../common/text";

const LandingPageHero = ({ data }) => {
  return (
    <main className="container flex flex-col md:flex-row justify-between xl:items-center landing-page-hero">
      {/* Left column for content */}
      <div className="flex-1 sm:pr-8 pt-2 md:pt-16">
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
            <Button isLink key={button.id} type={button.type} button={button} />
          ))}
        </div>
      </div>

      {/* Right column for the image */}
      <div className="hidden md:flex flex-col justify-center md:pt-32 mr-0 xl:mr-60">
        <Image media={data.image} className="w-40 h-40" />
      </div>
    </main>
  );
};

export default LandingPageHero;
