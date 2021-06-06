import Image from "../../common/image";
import Text from "../../common/text";

import { getSocials } from "../../../utils/api";

const TeamProfile = ({ data, index }) => {
  const socials = getSocials(data);

  return (
    <div
      className="team-member"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay={index * 300}
      data-aos-offset="0"
    >
      <Image className="team-member__avatar" img={data.avatar} />
      <div className="team-member__content">
        <div className="team-member__name">{data.name}</div>
        <div className="team-member__post">{data.title}</div>
        <ul className="team-member__social">
          {socials.map(({ type, url }, index) => (
            // eslint-disable-next-line
            <li>
              <a
                key={index}
                href={url}
                target="_blank"
                rel="nofollow noreferrer"
              >
                <Image img={{ url: `../../images/${type}.svg`, alt: type }} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    // <div
    //   className="flex flex-row"
    //   data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
    //   data-aos-delay={index * 100}
    // >
    //   <Image
    //     img={data.avatar}
    //     className="mr-9"
    //     rounded
    //     style={{ width: 130, height: 130 }}
    //   />
    //   <div className="flex flex-col text-left">
    //     <Text type="h4">{data.name}</Text>
    //     <Text className="mb-5" type="p">
    //       {data.title}
    //     </Text>
    //     {data.bio && (
    //       <Text className="mb-7" type="p">
    //         {data.bio}
    //       </Text>
    //     )}
    //     <div className="flex flex-row flex-wrap">
    //       {socials.map(({ type, url }, index) => (
    //         // eslint-disable-next-line
    //         <a
    //           key={index}
    //           className="mr-2 mb-2"
    //           href={url}
    //           target="_blank"
    //           rel="nofollow"
    //         >
    //           <Image
    //             img={{ url: `../../images/${type}.svg`, alt: type }}
    //             style={{ width: 40, height: 40 }}
    //           />
    //         </a>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default TeamProfile;
