import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import MainContainer from "../../components/MainContainer/MainContainer";
import AsyncComponent from "../../components/Utils/AsyncComponent";
import SubsTable from "../../components/CustomTable/SubsTable";
import {
  deleteSubscription,
  selectExpincsOfSubscription,
  selectSubscription,
} from "../../redux/subscriptionsReducers/subscriptions.actions";
import Message from "../../components/Message";
import { useHistory } from "react-router";
import { subscriptionActionTypes } from "../../redux/subscriptionsReducers/subscriptions.actionTypes";
import { formatDate } from "../../utils/utils";
import PaymentModal from "../../components/CustomTable/PaymentModal";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
const SubscriptionDetailPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { subscription, loading, error } = useSelector(
    (state) => state.subscription.selectSubscription
  );
  const {
    subscriptionList,
    loading: loadingSubs,
    error: errorSubs,
  } = useSelector((state) => state.subscription.subscriptionList);
  const { success: deleteSubSuccess } = useSelector(
    (state) => state.subscription.deleteSubscription
  );
  const { expincs } = useSelector(
    (state) => state.subscription.selectExpincsOfSubscription
  );
  const deleteHandler = (row_id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteSubscription(row_id));
    }
  };
  useEffect(() => {
    dispatch(selectSubscription(id));
    dispatch(selectExpincsOfSubscription(id));

    return () => {
      dispatch({ type: subscriptionActionTypes.RESET_SELECT_SUBSCRIPTION });
      dispatch({ type: subscriptionActionTypes.RESET_SELECT_EXPINCS_OF_SUB });
    };
  }, [id, dispatch, deleteSubSuccess]);
  return (
    <MainContainer>
      <Container className="paper_elevation overflow-scroll">
        <Row
          className="paper_elevation"
          style={{
            background: "#f78787",
            color: "#fff",
          }}
        >
          <Col>
            <h2>{t("Subscription Profile")}</h2>
          </Col>

          <Col className="align-content-center">
            <Button
              className="float-left my-4"
              onClick={() => history.goBack()}
              variant="primary"
            >
              {t("Back")}
            </Button>
          </Col>
        </Row>
        <Row
          className="hide-scrollbar mx-4"
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
                  <Col>
                    <Row>
                      <Col md={6}>
                        <span className="px-3">{t("Type")}:</span>
                        <span className="text-info">
                          {t(subscription.type)}
                        </span>
                      </Col>
                      <Col md={6}>
                        <span className="px-3">{t("Name")}:</span>
                        <span className="text-info">
                          {t(subscription.name)}
                        </span>
                      </Col>
                    </Row>

                    <Row className="pt-5">
                      <Col>
                        <span className="px-3">{t("Price")}:</span>
                        <span className="text-info">
                          {subscription.price} {t("$")}
                        </span>
                      </Col>
                      <Col>
                        <span className="px-3">{t("Paid")}:</span>
                        <span className="text-info">
                          {subscription.paid} {t("$")}
                        </span>
                      </Col>
                    </Row>
                    <Row className="pt-5">
                      <Col>
                        <span className="px-3">{t("StartedAt")}:</span>
                        <span className="text-info">
                          {formatDate(subscription.startedAt)}
                        </span>
                      </Col>
                      <Col>
                        <span className="px-3">{t("EndsAt")}:</span>

                        <span className="text-info">
                          {formatDate(subscription.endsAt)}
                        </span>
                      </Col>
                    </Row>
                    <Row className="pt-5">
                      <Col>
                        <span className="px-3">{t("User")}:</span>

                        <span className="text-info">
                          {subscription.user.name}
                        </span>
                      </Col>
                      <Col>
                        <span className="px-3">{t("Member")}:</span>

                        <Link
                          to={`/members/${subscription.member._id}/detail`}
                          className="text-warning"
                        >
                          {subscription.member.name}
                        </Link>
                      </Col>
                      {!subscription.paymentStatus && (
                        <Col md={4}>
                          <PaymentModal subId={subscription._id} loaded />
                        </Col>
                      )}
                    </Row>
                  </Col>
                </Row>

                <Row className="py-3">
                  {deleteSubSuccess && (
                    <Message className="mx-3">
                      {t("Subscription Deleted!")}
                    </Message>
                  )}
                  {subscription && subscriptionList && (
                    <AsyncComponent loading={loading} error={error}>
                      <h3 className="px-2">{t("Courses")}</h3>

                      <div className="w-100 mx-2">
                        <Table responsive hover>
                          <thead>
                            <tr>
                              <th>{t("Name")}</th>
                              <th>{t("Description")}</th>
                              <th>{t("Plan")}</th>
                              <th>{t("Period")}</th>
                              <th>{t("Price")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subscription.courses.map((course, idx) => {
                              return (
                                <tr key={idx + 1}>
                                  <td>
                                    {subscription.membership ? (
                                      <>
                                        <Badge variant="info">
                                          {t("Membership")}
                                        </Badge>{" "}
                                        {course.name}
                                      </>
                                    ) : (
                                      course.name
                                    )}
                                  </td>
                                  <td>{course.description}</td>
                                  <td>{course.plan || "شهرى"}</td>
                                  <td>{subscription.period}</td>
                                  <td>{course.price || course.monthlyPrice}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </AsyncComponent>
                  )}
                  {}
                </Row>
              </Container>
            )}

            {expincs && (
              <AsyncComponent loading={loading} error={error}>
                <h3 className="px-2">{t("Payment History")}</h3>
                <div className="w-100 mx-2">
                  <Table responsive variant="light" hover>
                    <thead>
                      <tr>
                        <th>{t("Description")}</th>
                        <th>{t("CreatedAt")}</th>
                        <th>{t("Value")}</th>
                        <th>{t("User")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(expincs) &&
                        expincs.map((expinc, idx) => {
                          return (
                            <tr key={idx + 1}>
                              <td>{expinc.description}</td>
                              <td>{formatDate(expinc.createdAt)}</td>
                              <td>{expinc.value}</td>
                              <td>{expinc.user.name}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </AsyncComponent>
            )}
          </AsyncComponent>
        </Row>
      </Container>
    </MainContainer>
  );
};

export default SubscriptionDetailPage;
