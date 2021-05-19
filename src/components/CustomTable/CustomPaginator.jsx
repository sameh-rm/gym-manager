import Pagination from "react-bootstrap/Pagination";
import { useSelector } from "react-redux";

const paginationItems = (currentPage, onChangeHandler, last) => {
  const items = [];
  const startIndex = currentPage - 2;
  for (var i = startIndex; items.length < 5; i++) {
    if (i > 1) {
      if (i >= last) break;
      items.push(
        <Pagination.Item
          key={i}
          onClick={onChangeHandler}
          active={currentPage === i}
        >
          {i}
        </Pagination.Item>
      );
    }
  }
  return items;
};
const CustomPaginator = ({
  first = 1,
  currentPage,
  dataLength,
  onChangeHandler,
  moreRows,
  setCurrentPage,
}) => {
  const page_rows_count = useSelector(
    (state) => state.core.login.page_rows_count
  );
  const lastPage = Math.ceil(dataLength / (page_rows_count + moreRows));
  return (
    <Pagination>
      {currentPage > 1 && (
        <>
          <Pagination.First
            style={{ margin: ".06rem" }}
            onClick={() => setCurrentPage(1)}
          />
          <Pagination.Prev
            style={{ margin: ".06rem" }}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
        </>
      )}
      {lastPage > 1 && (
        <Pagination.Item
          style={{ margin: ".06rem" }}
          onClick={onChangeHandler}
          active={currentPage === first}
        >
          {first}
        </Pagination.Item>
      )}
      {currentPage > first + 2 && <Pagination.Ellipsis />}

      {lastPage > 1 && (
        <>
          {paginationItems(currentPage, onChangeHandler, lastPage).map(
            (item) => item
          )}
          {lastPage > currentPage + 2 && <Pagination.Ellipsis />}

          <Pagination.Item
            style={{ margin: ".06rem" }}
            active={currentPage === lastPage}
            onClick={onChangeHandler}
          >
            {lastPage}
          </Pagination.Item>
        </>
      )}
      {currentPage < lastPage && (
        <>
          <Pagination.Next
            style={{ margin: ".06rem" }}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
          <Pagination.Last
            style={{ margin: ".06rem" }}
            onClick={() => setCurrentPage(lastPage)}
          />
        </>
      )}
    </Pagination>
  );
};

export default CustomPaginator;
