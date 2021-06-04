import classNames from "classnames";
import { MdClose } from "react-icons/md";

import Text from "../common/text";

const NotificationBanner = ({ data, closeSelf }) => {
  return (
    <div
      className={classNames("p-2", {
        "bg-green2": data.type === "info",
        "bg-orange-600": data.type === "warning",
        "bg-red-600": data.type === "alert",
      })}
    >
      <div className="md:container flex flex-row justify-between items-center">
        <Text className="flex-1 text-center">{data.text}</Text>
        <button onClick={closeSelf} className="px-1 py-1 flex-shrink-0">
          <MdClose className="h-6 w-auto" color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
