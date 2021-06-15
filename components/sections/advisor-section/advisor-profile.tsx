import OptimizedImage from "../../common/optimized-image";

import { getSocials } from "../../../utils/api";

const BoardProfile = ({ data, index }) => {
  const socials = getSocials(data);
  return (
    <div
      key={index}
      className="advisor"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay={index * 200}
      data-aos-offset="0"
    >
      <div className="advisor__img">
        <OptimizedImage img={data.avatar} layout="fill" />
        <div className="advisor__sn">
          {socials.map(({ type, url }, index: number) => (
            <a key={index} href={url} target="_blank" rel="nofollow noreferrer">
              <OptimizedImage
                img={{ url: `/images/${type}.svg`, alternativeText: type }}
                width={28}
                height={28}
                layout="intrinsic"
              />
            </a>
          ))}
        </div>
      </div>
      <div className="advisor__content">
        <div className="advisor__title">{data.name}</div>
        <div className="advisor__post">{data.title}</div>
        <div className="advisor__text">{data.bio}</div>
      </div>
    </div>
  );
};

export default BoardProfile;
