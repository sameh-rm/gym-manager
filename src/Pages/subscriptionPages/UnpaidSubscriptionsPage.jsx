import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectItemByUrl } from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import MainContainer from "../../components/MainContainer/MainContainer";

import SubsTable from "../../components/CustomTable/SubsTable";
import { listAllUnpaidSubscriptions } from "../../redux/subscriptionsReducers/subscriptions.actions";
import { Button } from "react-bootstrap";
const UnpaidSubscriptionsPage = ({ history, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectItemByUrl(location.pathname));
  }, [dispatch, location]);

  const { unpaidSubscriptionList, loading, error } = useSelector(
    (state) => state.subscription.listAllUnpaidSubs
  );
  useEffect(() => {
    dispatch(listAllUnpaidSubscriptions());
  }, [dispatch]);
  const columns = [
    "description",
    "startedAt",
    "endsAt",
    "price",
    "paymentStatus",
  ];

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Unpaid Subscriptions")}</h2>
          </Col>

          <Col className="align-content-center">
            <Button
              className="float-left my-4"
              variant="dark"
              onClick={() => history.goBack()}
            >
              {t("Back")}
            </Button>
          </Col>
        </Row>

        <Row
          className="hide-scrollbar"
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <SubsTable
            noAdd
            columns={columns}
            listData={listAllUnpaidSubscriptions}
            data={unpaidSubscriptionList || []}
            noDelete
            loading={loading}
            error={error}
            editEndpoint="subscriptions"
            detailEndpoint="subscriptions"
          />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default UnpaidSubscriptionsPage;
