import classNames from "classnames";
import { MdClose } from "react-icons/md";

import RichText from "../common/rich-text";

const NotificationBanner = ({ data, closeSelf }) => {
  return (
    <div
      id="notification-banner"
      className={classNames("p-2", {
        "bg-green2": data.type === "info",
        "bg-orange-600": data.type === "warning",
        "bg-red-600": data.type === "alert",
      })}
    >
      <div className="container flex flex-row flex-1 justify-between items-center">
        <div />
        <RichText
          className="notification-banner-content"
          children={data.text}
          skipHtml={true}
        />
        <button onClick={closeSelf} className="flex-shrink-0">
          <MdClose className="h-6 w-auto" color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
