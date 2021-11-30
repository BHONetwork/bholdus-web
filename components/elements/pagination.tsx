import classNames from "classnames";

import CustomLink from "../common/custom-link";

const Pagination = ({
  totalPage,
  currentPage,
  generateNavigateLink,
  numOfPageDisplay,
}) => {
  const returnDisplayPageNumber = ({
    currentPage,
    totalPage,
    numOfPageDisplay,
  }) => {
    let beginPaginateNumber = currentPage - Math.floor(numOfPageDisplay / 2);
    let endPaginateNumber =
      currentPage + Math.floor(numOfPageDisplay / 2) > totalPage
        ? totalPage
        : currentPage + Math.floor(numOfPageDisplay / 2);

    if (numOfPageDisplay % 2 === 0) {
      beginPaginateNumber += 1;
    }

    if (beginPaginateNumber < 1) {
      beginPaginateNumber = 1;
      endPaginateNumber =
        beginPaginateNumber +
        (totalPage > numOfPageDisplay - 1
          ? numOfPageDisplay - 1
          : totalPage - 1);
    }

    if (
      endPaginateNumber - beginPaginateNumber < numOfPageDisplay - 1 &&
      beginPaginateNumber > 1
    ) {
      let numOfLackPreviousPage =
        (totalPage < numOfPageDisplay ? totalPage : numOfPageDisplay) -
        (endPaginateNumber - beginPaginateNumber + 1);
      beginPaginateNumber = beginPaginateNumber - numOfLackPreviousPage;
    }

    return { beginPaginateNumber, endPaginateNumber };
  };

  const { beginPaginateNumber, endPaginateNumber } = returnDisplayPageNumber({
    currentPage,
    totalPage,
    numOfPageDisplay,
  });

  if (totalPage > 1) {
    return (
      <div className="pagination">
        <ul className="list-page">
          {totalPage > numOfPageDisplay && (
            <li className="item-page">
              <CustomLink
                className="link-item link-prev"
                link={{
                  url: generateNavigateLink(1),
                }}
              >
                «
              </CustomLink>
            </li>
          )}
          {new Array(endPaginateNumber - beginPaginateNumber + 1)
            .fill(0)
            .map((value, index) => {
              const pageNumber = index + beginPaginateNumber;
              return (
                <li className="item-page">
                  <CustomLink
                    key={`page-num-${pageNumber}`}
                    className={classNames("link-item", {
                      "link-active": currentPage === pageNumber,
                    })}
                    link={{
                      url: generateNavigateLink(pageNumber),
                    }}
                  >
                    {pageNumber}
                  </CustomLink>
                </li>
              );
            })}
          {totalPage > numOfPageDisplay && (
            <li className="item-page">
              <CustomLink
                className="link-item link-next"
                link={{
                  url: generateNavigateLink(totalPage),
                }}
              >
                »
              </CustomLink>
            </li>
          )}
        </ul>
      </div>
    );
  }

  return null;
};

export default Pagination;
