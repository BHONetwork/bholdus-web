import classNames from "classnames";
import { MdClose } from "react-icons/md";

import RichText from "../common/rich-text";

const NotificationBanner = ({ data, closeSelf }) => {
  return (
    <div
      id="notification-banner"
      className={classNames({
        "bg-green2": data.type === "info",
        "bg-orange-600": data.type === "warning",
        "bg-red-600": data.type === "alert",
      })}
    >
      <div className="container">
        <div />
        <RichText
          className="notification-banner-content"
          children={data.text}
          skipHtml={true}
        />
        <button onClick={closeSelf} aria-label="close">
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
