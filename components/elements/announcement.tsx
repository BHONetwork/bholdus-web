import classNames from "classnames";

import OptimizedImage from "../common/optimized-image";
const Announcement = ({ data, show }) => {
  if (data?.enable && show)
    return (
      <div
        className={classNames("announcement")}
        style={{ marginLeft: -(data.width / 2) }}
      >
        <div className="container">
          <div className="announcement-container">
            <div className="announcement-image">
              <a
                key={data.id}
                href={data.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <OptimizedImage
                  img={data.image}
                  width={data.width}
                  height={data.height}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  return null;
};

export default Announcement;
