import classNames from "classnames";
import { Popover } from "@headlessui/react";
import { useState } from "react";

export default function StyledPopover({ children, button, position = "top" }) {
  return (
    <div className="popover-container">
      <Popover className={classNames("popover", position)}>
        <Popover.Button className="w-full outline-none focus:outline-none">
          {button}
        </Popover.Button>
        <Popover.Panel className="bg-white popover-box">
          <div className="popover-content">{children}</div>
        </Popover.Panel>
      </Popover>
    </div>
  );
}
