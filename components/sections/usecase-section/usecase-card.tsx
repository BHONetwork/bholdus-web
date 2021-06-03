import Image from "../../common/image";
import Text from "../../common/text";

const UsecaseCard = ({ data }) => {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <Image
        img={data.image}
        className="mr-7"
        style={{ width: 150, height: 150 }}
      />
      <div className="flex flex-col text-center lg:text-left">
        <Text className="mb-2" type="h4">
          {data.title}
        </Text>
        <Text type="p">{data.description}</Text>
      </div>
    </div>
  );
};

export default UsecaseCard;
