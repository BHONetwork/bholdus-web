import { MdFilterDrama } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";

import CustomLink from "../components/common/custom-link";
import Text from "../components/common/text";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center mt-32 md:mt-52 space-y-10">
      <MdFilterDrama size={150} color="#fff" />
      <Text type="h1">Oooooops.....</Text>
      <Text size="medium">{t("common:thePageCannotBeFound")}</Text>
      <CustomLink link={{ url: "/" }}>
        <Text size="medium" style={{ textDecoration: "underline" }}>
          {t("common:goBackToHomepage")}
        </Text>
      </CustomLink>
    </div>
  );
};

export default NotFoundPage;
