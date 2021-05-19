import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({
  currentPage,
  setCurrentPage,
  last,
  numbersOfPages,
}) => {
  return last > 1 ? (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item
        active={currentPage === 1}
        onClick={(e) => {
          setCurrentPage(e.target.innerText);
        }}
      >
        {1}
      </Pagination.Item>
      {last > 3 && <Pagination.Ellipsis />}
      {numbersOfPages.map((num, idx) => (
        <Pagination.Item
          key={idx + 1}
          active={num === currentPage}
          value={num}
          onClick={(e) => {
            console.log();
            setCurrentPage(e.target.innerText);
          }}
        >
          {num}
        </Pagination.Item>
      ))}

      <Pagination.Ellipsis />
      <Pagination.Item
        onClick={(e) => {
          setCurrentPage(e.target.innerText);
        }}
      >
        {last}
      </Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  ) : (
    <></>
  );
};

export default CustomPagination;
