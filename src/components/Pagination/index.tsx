/**
 * Resuable Pagination component
 * @author Sahil Siddiqui
 * @since 24th october 2020
 */
import React from "react";
import { ICON } from "../../assets/index";
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
  <div className="pagination">
    <div className="pagination-button">
      {page !== 1 && (
        <img
          title="previous page"
          alt="previous page"
          src={ICON.PREV_PAGE}
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
          src={ICON.NEXT_PAGE}
          onClick={() => nextPage()}
          className="pagination-icon"
          loading="lazy"
        />
      )}
    </div>
  </div>
);

export { Pagination };
