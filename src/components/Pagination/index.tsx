/**
 * Resuable Pagination component
 * @author Sahil Siddiqui
 * @since 24th october 2020
 */
import React from "react";
import { ASSETS } from "../../constants";
import "./index.scss";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  size: number;
  nextPage: Function;
  previousPage: Function;
}

const Pagination = ({
  page,
  limit,
  total,
  size,
  nextPage,
  previousPage,
}: PaginationProps) => (
  <React.Fragment>
    <div className="pagination-button">
      {page !== 1 && (
        <img
          title="previous page"
          alt="previous page"
          src={ASSETS.PREV_PAGE}
          onClick={() => previousPage()}
          className="pagination-icon"
          loading="lazy"
        />
      )}
    </div>

    <div className="pagination-view">
      {limit * (page - 1) + size}
      <span className="pagination-location"> of </span>
      {total}
    </div>

    <div className="pagination-button">
      {limit * page < total && (
        <img
          alt="next page"
          title="next page"
          src={ASSETS.NEXT_PAGE}
          onClick={() => nextPage()}
          className="pagination-icon"
          loading="lazy"
        />
      )}
    </div>
  </React.Fragment>
);

export { Pagination };
