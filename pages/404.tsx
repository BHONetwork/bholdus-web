import { MdFilterDrama } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";

import CustomLink from "../components/common/custom-link";
import Text from "../components/common/text";
import Layout from "../components/layout";

const NotFoundPage = ({ global }) => {
  const { t } = useTranslation();

  return (
    <Layout Hero={() => null} global={global} mainClass="bg-white">
      <div className="flex flex-col items-center mt-32 md:mt-52 space-y-10">
        <MdFilterDrama size={150} />
        <Text type="h1" style={{ color: "#545C79" }}>
          Oooooops.....
        </Text>
        <Text size="medium" color="black">
          {t("common:thePageCannotBeFound")}
        </Text>
        <CustomLink link={{ url: "/" }}>
          <Text size="medium" style={{ color: "#0000FF" }}>
            {t("common:goBackToHomepage")}
          </Text>
        </CustomLink>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
