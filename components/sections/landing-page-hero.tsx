import Button from "../common/button";
import RichText from "../common/rich-text";

const LandingPageHero = ({ data }) => {
  return (
    <section id="banner-home">
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
