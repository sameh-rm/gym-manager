import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../Message";
import AsyncComponent from "../Utils/AsyncComponent";
import { TableTD } from "./CustomTD";
import TableSearch from "./TableSearch";
import CustomPaginator from "./CustomPaginator";
import { paginate } from "../../utils/utils";
import PaymentModal from "./PaymentModal";
import SubscriptionModal from "../forms/subscription/SubscriptionModal";

export const ActionsTD = ({
  children,
  deleteHandler,
  id,
  editEndpoint,
  subscription,
}) => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.core.login);
  return (
    <td className="align-middle">
      {!subscription.paymentStatus && <PaymentModal subId={subscription._id} />}
      {userInfo && userInfo.isAdmin && (
        <Button
          onClick={deleteHandler}
          variant="danger"
          className="table-action-btn mx-2 px-2"
          title={t("Delete")}
        >
          <i className="fas fa-trash"></i>
        </Button>
      )}
    </td>
  );
};

const searchData = (data, searchTxt) => {
  const results = data.filter(
    (item) => item.name.toLowerCase().includes(searchTxt.toLowerCase()) && item
  );
  return results;
};
/**
 *
 * @param {*} loadDateAction an action to dispatch
 * @param moreRows add more row to the paginator
 */
const SubsTable = ({
  columns,
  data,
  editEndpoint,
  loading,
  error,
  success,
  deleteHandler,
  listData,
  moreRows = 0,
  noActions,
  member,
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
  }, [data]);
  return (
    <Container>
      <AsyncComponent loading={loading} error={error}>
        {success && (
          <Message variant="info">{t("Item Was Deleted Successfully")}</Message>
        )}
        <Row>
          <Col md={8}>
            <TableSearch
              searchTxt={searchTxt}
              searchHandler={searchHandler}
              searchSize={8}
            />
          </Col>
          <Col>
            <SubscriptionModal member={member} className="float-left" />
          </Col>
        </Row>
        <div className="hide-scrollbar" style={{ height: "550px" }}>
          <Table striped hover bordered responsive className="mt-3">
            <thead>
              <tr>
                <th>{t("Name")}</th>
                {columns.map((col, idx) => (
                  <th key={idx}>
                    {t(col[0].toUpperCase() + col.substring(1))}
                  </th>
                ))}
                <th>{t("Remains")}</th>

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
                    <TableTD>
                      <Link to={`/${editEndpoint}/${row._id}/detail`}>
                        {row.name}
                      </Link>
                      <Row className="px-2">
                        {row.type === "Membership" && (
                          <Badge variant="warning">{t("Membership")}</Badge>
                        )}
                      </Row>
                    </TableTD>
                    {columns.map(
                      (k, idx2) =>
                        k !== "_id" && (
                          <TableTD
                            key={idx2}
                            cellData={row[k]}
                            alt={row.name ? row.name : ""}
                          >
                            {k === "endsAt" || k === "startedAt"
                              ? row[k].substring(0, 10)
                              : row[k]}
                          </TableTD>
                        )
                    )}
                    <TableTD>{row.price - row.paid}</TableTD>
                    {!noActions && (
                      <ActionsTD
                        id={row._id}
                        deleteHandler={() => {
                          deleteHandler(row._id);
                        }}
                        editEndpoint={editEndpoint}
                        subscription={row}
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

export default SubsTable;
