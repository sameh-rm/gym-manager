import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectItemByUrl } from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import MainContainer from "../../components/MainContainer/MainContainer";
import { LinkContainer } from "react-router-bootstrap";
import ExpIncTable from "../../components/CustomTable/ExpIncTable";
import Message from "../../components/Message";
import {
  deleteExpInc,
  confirmExpinc,
  listAllUnConfirmed,
} from "../../redux/expincReducers/expinc.actions";
const UnConfirmedExpincPage = ({ history, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [deletedSuccess, setDeletedSuccess] = useState();
  useEffect(() => {
    dispatch(selectItemByUrl(location.pathname));
  }, [dispatch, location]);
  const { listUnConfirmed, loading, error, success } = useSelector(
    (state) => state.expinc.listUnConfirmed
  );

  const deleteHandler = (id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteExpInc(id));
      setDeletedSuccess(t("Expinc Was Deleted Successfully!"));
    }
  };

  const editHandler = (id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(confirmExpinc(id));
      setDeletedSuccess(t("Expinc Was Confirmed Successfully!"));
    }
  };

  useEffect(() => {
    dispatch(listAllUnConfirmed());
  }, [dispatch, deletedSuccess, success]);
  const columns = [
    // "description",
    "value",
    "createdAt",
    "updatedAt",
    "confirmed",
  ];

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("UnConfirmedList")}</h2>
          </Col>

          <Col className="align-content-center">
            <Button
              className="float-left my-4"
              variant="primary"
              onClick={() => {
                history.goBack();
              }}
            >
              {t("Back")}
            </Button>
          </Col>
        </Row>

        {deletedSuccess && <Message variant="info">{deletedSuccess}</Message>}
        <Row
          className="hide-scrollbar"
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          {listUnConfirmed && (
            <ExpIncTable
              columns={columns}
              data={listUnConfirmed}
              deleteHandler={deleteHandler}
              loading={loading}
              error={error}
              editEndpoint="expenses/confirm"
              detailEndpoint="expenses"
              editIcon={<i className="far fa-check-double"></i>}
              editHandler={editHandler}
            />
          )}
        </Row>
      </Container>
    </MainContainer>
  );
};

export default UnConfirmedExpincPage;
