import Image from "../../common/image";
import Text from "../../common/text";

import { getSocials } from "../../../utils/api";

const TeamProfile = ({ data, index }) => {
  const socials = getSocials(data);

  return (
    <div
      className="flex flex-row"
      data-aos={index % 2 == 0 ? "fade-left" : "fade-right"}
      data-aos-delay={index * 100}
    >
      <Image
        img={data.avatar}
        className="mr-9"
        rounded
        style={{ width: 130, height: 130 }}
      />
      <div className="flex flex-col text-left">
        <Text type="h4">{data.name}</Text>
        <Text className="mb-5" type="p">
          {data.title}
        </Text>
        {data.bio && (
          <Text className="mb-7" type="p">
            {data.bio}
          </Text>
        )}
        <div className="flex flex-row flex-wrap">
          {socials.map(({ type, url }, index) => (
            // eslint-disable-next-line
            <a
              key={index}
              className="mr-2 mb-2"
              href={url}
              target="_blank"
              rel="nofollow"
            >
              <Image
                img={{ url: `../../images/${type}.svg`, alt: type }}
                style={{ width: 40, height: 40 }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;
