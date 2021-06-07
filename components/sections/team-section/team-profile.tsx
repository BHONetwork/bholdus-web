import Image from "../../common/image";

import { getSocials } from "../../../utils/api";

const TeamProfile = ({ data, index }) => {
  const socials = getSocials(data);

  return (
    <div
      className="team-member"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay={200}
      data-aos-offset="0"
    >
      <Image className="team-member__avatar" img={data.avatar} />
      <div className="team-member__content">
        <div className="team-member__name">{data.name}</div>
        <div className="team-member__post">{data.title}</div>
        <ul className="team-member__social">
          {socials.map(({ type, url }, index: number) => {
            if (url !== null)
              return (
                <li key={index}>
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="nofollow noreferrer"
                  >
                    <Image img={{ url: `/images/${type}.svg`, alt: type }} />
                  </a>
                </li>
              );
            return null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default TeamProfile;
