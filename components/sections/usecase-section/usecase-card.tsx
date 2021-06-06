import Image from "../../common/image";
import Text from "../../common/text";

const UsecaseCard = ({ data, index }) => {
  const data_aos = index % 2 === 0 ? "fade-right" : "fade-left";
  return (
    <div
      key={data.id}
      className="flex flex-col lg:flex-row items-center md:items-start  lg:items-center pb-8 pt-8"
      data-aos={data_aos}
      data-aos-delay={400}
      data-aos-easing="ease-in-sine"
    >
      <Image
        img={data.image}
        className="mr-0 md:mr-7"
        style={{ width: 150, height: 150 }}
      />
      <div className="flex flex-col items-center  md:items-start  text-justify w-full h-full">
        <Text className="mb-4" type="h4">
          {data.title}
        </Text>
        <Text type="p">{data.description}</Text>
      </div>
    </div>
  );
};

export default UsecaseCard;
