import Image from "../../common/image";
import Text from "../../common/text";

const ServiceCard = ({ data, background }) => {
  return (
    <div
      className="flex flex-col items-center justify-center pt-16 pb-9 rounded"
      style={{
        background,
      }}
    >
      <Image className="mb-12" img={data.image} />
      <Text size="normal" weight="bold">
        {data.title}
      </Text>
    </div>
  );
};

export default ServiceCard;
