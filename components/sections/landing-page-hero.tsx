import Button from "../common/button";
import RichText from "../common/rich-text";

const splitSiteTitle = (siteTitle: string) => {
  if (siteTitle) {
    const splitArrayString = siteTitle.split("\n");
    if (splitArrayString.length > 0) {
      const firstLabel = splitArrayString[0];
      splitArrayString.shift();
      const mainTitle = splitArrayString.join("\n");

      return { firstLabel, mainTitle };
    }
    return { firstLabel: "", mainTitle: "" };
  }
  return { firstLabel: "", mainTitle: "" };
};

const LandingPageHero = ({ data }) => {
  const { firstLabel, mainTitle } = splitSiteTitle(data.title);
  return (
    <section id="banner-home">
      <div className="container">
        <div className="banner-home">
          <div className="wrap-banner">
            <div className="title-banner title-section">
              <h2 className="site-title">
                <span className="first-label">{firstLabel}</span>
                {mainTitle}
              </h2>
              {/* NOTE: SEO optimize */}
              {/* <RichText children={data.title} /> */}
            </div>
            <div className="desc-banner">
              <RichText children={data.description} />
            </div>
            <div className="button-banner">
              {data.actions.map((button: any) => (
                <Button isLink key={button.id} button={button} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageHero;
