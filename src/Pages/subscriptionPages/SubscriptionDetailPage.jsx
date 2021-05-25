import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import MainContainer from "../../components/MainContainer/MainContainer";
import AsyncComponent from "../../components/Utils/AsyncComponent";
import { selectSubscription } from "../../redux/memberReducers/member.actions";
import { memberActionTypes } from "../../redux/memberReducers/member.actionTypes";
import SubsTable from "../../components/CustomTable/SubsTable";
import { deleteSubscription } from "../../redux/subscriptionsReducers/subscriptions.actions";
import Message from "../../components/Message";
import { useHistory } from "react-router";
const SubscriptionDetailPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { subscription, loading, error } = useSelector(
    (state) => state.member.selectSubscription
  );
  const {
    subscriptionList,
    loading: loadingSubs,
    error: errorSubs,
  } = useSelector((state) => state.subscription.subscriptionList);
  const { success: deleteSubSuccess } = useSelector(
    (state) => state.subscription.deleteSubscription
  );
  const columns = ["description", "startedAt", "endsAt", "paymentStatus"];
  const deleteHandler = (row_id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteSubscription(row_id));
    }
  };
  useEffect(() => {
    dispatch(selectSubscription(id));

    return () => {
      dispatch({ type: memberActionTypes.RESET_SELECT_MEMBER });
    };
  }, [id, dispatch, deleteSubSuccess]);

  return (
    <MainContainer>
      <Container className="paper_elevation overflow-scroll">
        <Row className="paper_elevation">
          <Col>
            <h2>{t("Subscription Profile")}</h2>
          </Col>

          <Col className="align-content-center">
            <Button
              className="float-left my-4"
              onClick={() => history.goBack()}
              variant="dark"
            >
              {t("Back")}
            </Button>
          </Col>
        </Row>
        <Row
          className="hide-scrollbar"
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <hr />
          <AsyncComponent
            loading={loading || loadingSubs}
            error={error || errorSubs}
          >
            {subscription && (
              <Container>
                <Row className="p-5">
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        {t("Name")}:{" "}
                        <span className="text-success">
                          {subscription.name}
                        </span>
                      </Col>
                    </Row>

                    <Row className="pt-5">
                      <Col md={6}>
                        {t("NationalId")}:{" "}
                        <span className="text-success">
                          {subscription.type}
                        </span>
                      </Col>
                      <Col md={6}>
                        {t("Phone")}:{" "}
                        <span className="text-success">
                          {subscription.price}
                        </span>
                      </Col>
                    </Row>
                    <Row className="pt-5">
                      <Col md={4}>
                        {t("Age")}:{" "}
                        <span className="text-success">
                          {subscription.paid}
                        </span>
                      </Col>
                      <Col md={4}>
                        {t("Tall")}:{" "}
                        <span className="text-success">
                          {subscription.startedAt}
                        </span>
                      </Col>
                      <Col md={4}>
                        {t("Weight")}:{" "}
                        <span className="text-success">
                          {subscription.endsAt}
                        </span>
                      </Col>
                    </Row>
                    <Row className="pt-5">
                      <Col>
                        {t("Address")}:{" "}
                        <span className="text-success">
                          {subscription.user.name}
                        </span>
                      </Col>
                      <Col>
                        {t("City")}:{" "}
                        <span className="text-success">
                          {subscription.member.name}
                        </span>
                      </Col>
                    </Row>
                    <Row className="pt-3">
                      <Col>
                        {t("Center")}:{" "}
                        <span className="text-success">
                          {subscription.course.name}
                        </span>
                      </Col>
                      <Col>
                        {t("Governorate")}:
                        <span className="text-success">
                          {subscription.membership.name}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="py-5">
                  {deleteSubSuccess && (
                    <Message className="mx-3">
                      {t("Subscription Deleted!")}
                    </Message>
                  )}
                  {subscription && subscriptionList && (
                    <SubsTable
                      member={subscription}
                      columns={columns}
                      data={subscriptionList}
                      deleteHandler={deleteHandler}
                      loading={loading}
                      error={error}
                      editEndpoint="subscriptions"
                      moreRows={3}
                    />
                  )}
                </Row>
              </Container>
            )}
          </AsyncComponent>
        </Row>
      </Container>
    </MainContainer>
  );
};

export default SubscriptionDetailPage;
