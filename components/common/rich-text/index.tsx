import MarkDown from "./markdown";

import { RichTextProps } from "./types";

const RichText = (props: RichTextProps) => {
  return <MarkDown {...props} />;
};

export default RichText;
