import React from "react";
import { useMemo } from "react";
import styled from "styled-components";
//nhan vao page(current page), limit(products), total(products), onPagiChange(total/limit)
//math.ceil -> round up
//useMemo (dependencies change -> calculate again)
//Page_step: so luong buoc phan trang (2 -> 2 trang truoc va 2 trang sau)
const PAGE_STEP = 2;
const Pagination = ({ page, limit, total, onPagiChange }) => {
  const totalPage = useMemo(() => {
    if (!limit || !total) {
      return 1;
    }
    return Math.ceil(Number(total) / Number(limit)) || 1;
  }, [limit, total]);

  const pageList = useMemo(() => {
    let start = page - PAGE_STEP;
    let end = page + PAGE_STEP;
    if (start <= 0) {
      start = 1;
      end = start + PAGE_STEP * 2;
      if (end > totalPage) {
        end = totalPage;
      }
    }
    if (end >= totalPage) {
      end = totalPage;
      start = end - PAGE_STEP * 2;
      if (start < 1) {
        start = 1;
      }
    }
    const list = [];
    for (let index = start; index < end + 1; index++) {
      list.push(index);
    }
    return list;
  }, [page, totalPage]);

  const onNext = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPage) {
      onPagiChange(nextPage);
    }
  };

  const onPrev = () => {
    const prevPage = page - 1;
    if (prevPage > 0) {
      onPagiChange(prevPage);
    }
  };
  const onFirst = () => {
    onPagiChange(1);
  };
  const onLast = () => {
    onPagiChange(totalPage);
  };

  //! ----------------- CONSOLE LOG ------------------------
  //   console.log("Props received by Pagination:", {
  //     pageList,
  //     page,
  //     limit,
  //     total,
  //     totalPage,
  //   });

  //* --------- UI ------------
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <PagiItem isDisable={page === 1} _onClick={onPrev}>
          <span aria-hidden="true">
            <i className="icon-long-arrow-left" />
          </span>
          Prev
        </PagiItem>
        <PagiItem isDisable={pageList[0] === 1} _onClick={onFirst}>
          First
        </PagiItem>
        {pageList?.length > 0 &&
          pageList.map((pageNum) => (
            <PagiItem
              key={pageNum}
              isActive={pageNum === page}
              _onClick={() => {
                onPagiChange(pageNum);
              }}
            >
              {pageNum}
            </PagiItem>
          ))}
        <PagiItem className="page-item-total">of {totalPage}</PagiItem>
        <PagiItem
          isDisable={pageList[pageList.length - 1] === totalPage}
          _onClick={onLast}
        >
          Last
        </PagiItem>
        <PagiItem
          isDisable={pageList[pageList.length - 1] === totalPage}
          _onClick={onNext}
        >
          Next
          <span aria-hidden="true">
            <i className="icon-long-arrow-right" />
          </span>
        </PagiItem>
      </ul>
    </nav>
  );
};

//* --------- Component -------
const PagiItem = ({
  children,
  isActive = false,
  isDisable = false,
  className = "",
  _onClick,
  ...props
}) => {
  return (
    <PagiItemWrapper
      className={`page-item ${className} ${isActive ? "active" : ""} ${
        isDisable ? "disabled" : ""
      }`}
      onClick={() => (isDisable ? {} : _onClick())}
      {...props}
    >
      <a className="page-link" href="#">
        {children}
      </a>
    </PagiItemWrapper>
  );
};

const PagiItemWrapper = styled.li`
  margin: 0 10px;
  .page-link {
    &:hover {
      color: #fcb941 !important;
    }
    display: flex;
    gap: 10px;
  }
`;
export default Pagination;
