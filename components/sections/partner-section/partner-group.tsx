import PartnerItem from "./partner-item";
import useTranslation from "next-translate/useTranslation";

const GroupPartners = ({ groupPartners }) => {
  const { t } = useTranslation();
  return (
    <div className="partners-group container">
      {Object.keys(groupPartners).map((key, index) => (
        <div key={index}>
          <h3 className="partners-group-title">{t(`common:partner-${key}`)}</h3>
          <div className="partners-container">
            {groupPartners[key].map((partner: any, index: number) => (
              <PartnerItem key={partner.id} data={partner} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupPartners;
