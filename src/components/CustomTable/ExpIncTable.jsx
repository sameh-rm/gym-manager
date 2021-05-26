import React, { useEffect, useState } from "react";
import { Badge, Container, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../Message";
import AsyncComponent from "../Utils/AsyncComponent";
import { TableTD, ActionsTD } from "./CustomTD";
import TableSearch from "./TableSearch";
import CustomPaginator from "./CustomPaginator";
import { paginate } from "../../utils/utils";

const searchData = (data, searchTxt) => {
  const results = data.filter(
    (item) =>
      item.description.toLowerCase().includes(searchTxt.toLowerCase()) && item
  );
  return results;
};
/**
 *
 * @param {*} loadDateAction an action to dispatch
 * @param moreRows add more row to the paginator
 */
const ExpIncTable = ({
  columns,
  data,
  editEndpoint,
  loading,
  error,
  success,
  deleteHandler,
  moreRows = 0,
  noActions,
  editIcon,
  editHandler,
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const page_rows_count = useSelector(
    (state) => state.core.login.page_rows_count
  );
  const [currentData, setCurrentData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const searchHandler = (e) => {
    setCurrentPage(1);
    setSearchTxt(e);
    setCurrentData(searchData(data, e));
  };
  useEffect(() => {
    setPaginatedData(
      paginate(currentData, currentPage, page_rows_count + moreRows).results
    );
  }, [
    data,
    setPaginatedData,
    currentData,
    currentPage,
    page_rows_count,
    moreRows,
  ]);
  useEffect(() => {
    setCurrentData(data);
  }, [data, paginatedData]);

  return (
    <Container>
      <AsyncComponent loading={loading} error={error}>
        {success && (
          <Message variant="info">{t("Item Was Deleted Successfully")}</Message>
        )}
        <TableSearch searchTxt={searchTxt} searchHandler={searchHandler} />
        <div className="hide-scrollbar" style={{ height: "550px" }}>
          <Table striped hover bordered responsive className="mt-3">
            <thead>
              <tr>
                <th>{t("InOut")}</th>
                <th>{t("Description")}</th>
                {columns.map((col, idx) => (
                  <th key={idx}>
                    {t(col[0].toUpperCase() + col.substring(1))}
                  </th>
                ))}
                <th>{t("Member")}</th>
                <th>{t("Subscription")}</th>
                <th>{t("User")}</th>
                {!noActions && <th></th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData && paginatedData.length === 0 ? (
                <tr>
                  <td className="text-center">{t("No records to display")}</td>
                </tr>
              ) : (
                paginatedData &&
                paginatedData.map((row, idx) => (
                  <tr key={idx + 1}>
                    <TableTD
                      className={
                        row.inOut === "OUT" ? "bg-expense" : "bg-income"
                      }
                    >
                      {t(row.inOut)}
                    </TableTD>
                    <TableTD>{row.description}</TableTD>
                    {columns.map(
                      (k, idx2) =>
                        k !== "_id" && (
                          <TableTD
                            key={idx2}
                            cellData={row[k]}
                            alt={row.name ? row.name : ""}
                          >
                            {k === "createdAt" || k === "updatedAt"
                              ? row[k].replace("T", "  ").substring(0, 17)
                              : row[k]}
                          </TableTD>
                        )
                    )}

                    <TableTD>
                      {row.member ? (
                        <Link to={`/members/${row.member._id}/detail`}>
                          {row.member.name}
                        </Link>
                      ) : (
                        ""
                      )}
                    </TableTD>
                    <TableTD>
                      {row.subscription ? (
                        <Link
                          to={`/subscriptions/${row.subscription._id}/detail`}
                        >
                          {row.subscription.name}
                        </Link>
                      ) : (
                        ""
                      )}
                    </TableTD>
                    <TableTD>
                      {row.user ? (
                        <Link to={`/admin/users/${row.user._id}/detail`}>
                          {row.user.name}
                        </Link>
                      ) : (
                        ""
                      )}
                    </TableTD>
                    {!noActions && (
                      <ActionsTD
                        id={row._id}
                        deleteHandler={() => {
                          deleteHandler(row._id);
                        }}
                        editEndpoint={editEndpoint}
                        editIcon={editIcon}
                        editHandler={() => {
                          console.log(row._id);
                          editHandler(row._id);
                        }}
                      />
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        <div style={{ position: "relative", bottom: "0" }}>
          <CustomPaginator
            moreRows={moreRows}
            dataLength={currentData.length}
            currentPage={currentPage}
            onChangeHandler={(e) => {
              setCurrentPage(parseInt(e.target.innerText));
            }}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </AsyncComponent>
    </Container>
  );
};

export default ExpIncTable;
