import Text from "../common/text";

const PageHero = ({ page }) => {
  return (
    <section id="banner">
      <div className="container">
        <div className="banner">
          <p className="title-banner" id="title-post">
            {page.title}
          </p>
          <p className="breadcrumb-banner">
            {page.titleFooter && (
              <span className="text-home">{page.titleFooter}</span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
