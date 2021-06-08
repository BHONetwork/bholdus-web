import React from "react";
import Collapsible from "react-collapsible";

import DefaultTrigger from "./collapsible-trigger";
import DefaultContent from "./collapsible-markdown-content";

const CollapsibleAccordion = ({
  accordions,
  Trigger = null,
  Content = null,
}) => {
  const TriggerComponent = Trigger || DefaultTrigger;
  const ContentComponent = Content || DefaultContent;

  return (
    <div className="space-y-3">
      {accordions.map((accordion: any) => (
        <Collapsible trigger={<TriggerComponent accordion={accordion} />}>
          <div className="mt-2 px-7">
            <ContentComponent accordion={accordion} />
          </div>
        </Collapsible>
      ))}
    </div>
  );
};

export default CollapsibleAccordion;
