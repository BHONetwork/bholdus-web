import { MdFilterDrama } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import CustomLink from "../common/custom-link";

const NotFoundContent = ({
  emptyMessage = "common:thePageCannotBeFound",
  navigateMessage = "common:goBackToHomepage",
  navigateLink = "/",
}: {
  emptyMessage?: string;
  navigateMessage?: string;
  navigateLink?: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className="page-404">
      <MdFilterDrama size={150} />
      <h1>Oooooops.....</h1>
      <p>{t(emptyMessage)}</p>
      <CustomLink link={{ url: navigateLink }}>{t(navigateMessage)}</CustomLink>
    </div>
  );
};

export default NotFoundContent;
