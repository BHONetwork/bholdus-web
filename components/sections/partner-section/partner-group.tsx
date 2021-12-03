import PartnerItem from "./partner-item";
import useTranslation from "next-translate/useTranslation";

const GroupPartners = ({ groupPartners }) => {
  const { t } = useTranslation();
  return (
    <>
      {Object.keys(groupPartners).map((key, index) => (
        <div className="strategic-partners" key={index}>
          {/* <p className="title-partners title-small title-media">
            {t(`common:partner-${key}`)}
          </p> */}
          <div className="list-strategic">
            {groupPartners[key].map((partner: any, index: number) => (
              <PartnerItem key={partner.id} data={partner} index={index} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupPartners;
