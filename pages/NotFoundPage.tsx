import { MdFilterDrama } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import PageHero from "../components/sections/page-hero";
import CustomLink from "../components/common/custom-link";
import Layout from "../components/layout";

const NotFoundPage = ({ global }) => {
  const { t } = useTranslation();
  return (
    <Layout Hero={() => null} global={global} mainClass="page-container">
      <div className="page-404">
        <div className="page-404-wrapper">
          <MdFilterDrama size={150} />
          <h1>Oooooops.....</h1>
          <p>{t("common:thePageCannotBeFound")}</p>
          <CustomLink link={{ url: "/" }}>
            {t("common:goBackToHomepage")}
          </CustomLink>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
