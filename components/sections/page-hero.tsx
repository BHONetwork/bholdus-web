import Text from "../common/text";

const PageHero = ({ page }) => {
  return (
    <div className="container flex flex-row justify-center md:mt-40 mt-16">
      <Text type="h1" style={{ fontSize: "30px" }}>
        {page.title}
      </Text>
    </div>
  );
};

export default PageHero;
