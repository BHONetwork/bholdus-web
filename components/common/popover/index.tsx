import classNames from "classnames";
import { Popover } from "@headlessui/react";
import { useState } from "react";
import { usePopper } from "react-popper";

const PopOver = ({ children, button }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  return (
    <Popover className={classNames("popover-container")}>
      <Popover.Button
        className="w-full outline-none focus:outline-none"
        ref={setReferenceElement}
      >
        {button}
      </Popover.Button>
      <Popover.Panel
        className="bg-white popover-box"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {children}
        <div id="arrow" ref={setArrowElement} style={styles.arrow} />
      </Popover.Panel>
    </Popover>
  );
};
export default PopOver;
