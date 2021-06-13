import Image from "../../common/image";
import Text from "../../common/text";

const UsecaseCard = ({ data, index }) => {
  const data_aos = index % 2 === 0 ? "fade-right" : "fade-left";
  return (
    <div
      key={data.id}
      className="usecases-card"
      data-aos={data_aos}
      data-aos-delay={200}
      data-aos-easing="ease-in-sine"
    >
      <Image
        img={data.image}
        className="usecases-icon"
        style={{ width: 150, height: 150 }}
      />
      <div className="usecases-content">
        <Text className="usecases-title" type="h4">
          {data.title}
        </Text>
        <Text type="p">{data.description}</Text>
      </div>
    </div>
  );
};

export default UsecaseCard;
