import React from "react";

import NotFoundPage from "./NotFoundPage";

const Error = ({ statusCode, global }) => {
  if (statusCode) {
    switch (statusCode) {
      // NOTE: for other statusCode value, like 500
      case 404:
      default:
        return <NotFoundPage global={global} />;
    }
  }

  // NOTE: Uncaught error
  return <NotFoundPage global={global} />;
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
