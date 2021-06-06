import Image from "../../common/image";
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
        <Image img={data.avatar} />
        <div className="advisor__sn">
          {socials.map(({ type, url }, index: number) => (
            <a key={index} href={url} target="_blank" rel="nofollow noreferrer">
              <Image img={{ url: `../../images/${type}.svg`, alt: type }} />
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
