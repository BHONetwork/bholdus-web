import { useState } from "react";
import classNames from "classnames";

import OptimizedImage from "../common/optimized-image";
const Announcement = ({ data, show }) => {
  const [close, setClose] = useState(false);

  if (data?.enable && show)
    return (
      <div
        className={classNames("announcement", { hidden: close })}
        style={{ marginLeft: -(data.width / 2) }}
      >
        <div className="container">
          <div className="announcement-container">
            <button
              className="announcement-close"
              onClick={() => setClose(true)}
            >
              <OptimizedImage
                img={{
                  url: "/images/close.svg",
                  alternativeText: "play-button",
                }}
                width={25}
                height={25}
              />
            </button>
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
