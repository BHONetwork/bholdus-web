import Text from "../common/text";

const PageHero = ({ page }) => {
  return (
    <div className="container flex flex-col items-center md:mt-40 mt-28 text-center">
      <Text type="h1" color="black">
        {page.title}
      </Text>
      {page.titleFooter && (
        <Text className="mt-3" color="black">
          {page.titleFooter}
        </Text>
      )}
    </div>
  );
};

export default PageHero;
