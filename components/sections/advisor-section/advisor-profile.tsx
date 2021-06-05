import Image from "../../common/image";
import Text from "../../common/text";

import { getSocials } from "../../../utils/api";

const BoardProfile = ({ data }) => {
  const socials = getSocials(data);

  return (
    <div key={data.id} className="flex md:flex-row flex-col">
      <Image className="md:w-2/5" img={data.avatar} />
      <div
        className="flex flex-col text-left lg:p-10 p-4"
        style={{
          background:
            "linear-gradient(100.94deg, #16B04B 22.46%, #39B54A 131.92%)",
        }}
      >
        <div className="relative">
          <div
            className="flex flex-row flex-wrap gap-2 lg:flex-col lg:absolute mb-2"
            style={{ left: -58 }}
          >
            {socials.map(({ type, url }, index: number) => (
              // eslint-disable-next-line
              <a key={index} href={url} target="_blank" rel="nofollow">
                <Image
                  img={{ url: `../../images/${type}.svg`, alt: type }}
                  style={{ width: 40, height: 40 }}
                />
              </a>
            ))}
          </div>
        </div>
        <Text type="h4">{data.name}</Text>
        <Text className="mb-5" type="p">
          {data.title}
        </Text>
        <Text type="p">{data.bio}</Text>
      </div>
    </div>
  );
};

export default BoardProfile;
