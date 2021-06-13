import React from "react";
import Collapsible from "react-collapsible";
import classNames from "classnames";
import DefaultTrigger from "./collapsible-trigger";
import DefaultContent from "./collapsible-markdown-content";

const CollapsibleAccordion = ({
  className = "",
  accordions,
  Trigger = null,
  Content = null,
}) => {
  const TriggerComponent = Trigger || DefaultTrigger;
  const ContentComponent = Content || DefaultContent;

  return (
    <div className={classNames("space-y-3", className)}>
      {accordions.map((accordion: any) => (
        <Collapsible
          key={accordion.id}
          trigger={<TriggerComponent accordion={accordion} />}
        >
          <div className="mt-2 px-7">
            <ContentComponent accordion={accordion} />
          </div>
        </Collapsible>
      ))}
    </div>
  );
};

export default CollapsibleAccordion;
