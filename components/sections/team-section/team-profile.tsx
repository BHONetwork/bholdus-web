import OptimizedImage from "../../common/optimized-image";

import { getSocials } from "../../../utils/api";

const TeamProfile = ({ data, index }) => {
  const socials = getSocials(data);

  return (
    <div key={index} className="item-our-brain">
      <div className="img-item">
        <OptimizedImage img={data.avatar} layout="fill" />
      </div>
      <div className="info-item">
        <div className="wrap-info">
          <p className="title-item">{data.name}</p>
          <h2 className="position-item">{data.title}</h2>
        </div>
        <div className="social-item">
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
      <p className="desc-item">{data.bio}</p>
    </div>
  );
};

export default TeamProfile;
