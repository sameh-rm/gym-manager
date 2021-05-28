import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import MembersCountChart from "../../components/charts/MembersCountChar";
import MainContainer from "../../components/MainContainer/MainContainer";
import { loadConfigs } from "../../redux/coreReducers/adminReducers/admin.actions";
import { adminActionTypes } from "../../redux/coreReducers/adminReducers/admin.actionTypes";
import { listAllSubscriptionsInDateRange } from "../../redux/subscriptionsReducers/subscriptions.actions";
const Dashboard = () => {
  const { t } = useTranslation();
  const { count: subsInDay } = useSelector(
    (state) => state.subscription.subscriptionListInDateRange
  );
  const { count: dailySubsInDay } = useSelector(
    (state) => state.subscription.dailySubsInDateRange
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadConfigs());
  }, [dispatch]);

  return (
    <MainContainer>
      <Row style={{ height: "20%", color: "invert", margin: ".5rem" }}>
        <Col className="paper_elevation " style={{ margin: ".5rem" }}>
          <Row
            className="p-3 text-white paper_elevation"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              background: "rgb(171 145 206 / 85%)",
              borderBottomLeftRadius: "60px",
            }}
          >
            {t("Members Count")}
          </Row>
          <Row
            className="mt-1 mx-auto justify-content-center align-items-center"
            style={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            <Col className="text-info">
              <i className="fal fa-male"></i> <span>0</span>
            </Col>
            <Col className="text-danger">
              <i className="fal fa-female"></i> <span>0</span>
            </Col>
          </Row>
        </Col>
        <Col className="paper_elevation" style={{ margin: ".5rem" }}>
          <Row
            className="p-3 text-white paper_elevation"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              background: "rgb(24 188 156 / 75%)",
              borderBottomLeftRadius: "50px",
              borderBottomRightRadius: "30px",
            }}
          >
            <span className="m-auto"> {t("Balance")}</span>
          </Row>
          <Row
            className="mt-1 mx-auto  justify-content-center align-items-center"
            style={{ fontWeight: "bold" }}
          >
            <Col md={4} className="text-success" style={{ fontSize: "2rem" }}>
              <i className="far fa-badge-dollar"></i>
            </Col>
            <Col md={8} className="text-success" style={{ fontSize: "1.5rem" }}>
              9999 {t("$")}
            </Col>
          </Row>
        </Col>
        <Col className="paper_elevation" style={{ margin: ".5rem" }}>
          <Row
            className="p-3 text-white paper_elevation  justify-content-end"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              background: "rgb(32 197 222 / 50%)",
              borderBottomLeftRadius: "30px",
              borderBottomRightRadius: "50px",
            }}
          >
            <span className="mx-auto">{t("New Membership")}</span>
          </Row>
          <Row
            className="mt-1 mx-auto justify-content-center align-items-center"
            style={{ fontWeight: "bold" }}
          >
            <Col className="text-info" style={{ fontSize: "2rem" }}>
              <i className="far fa-house-return"></i>
            </Col>
            <Col className="text-info " style={{ fontSize: "1.7rem" }}>
              <span>{subsInDay || 0}</span>
            </Col>
          </Row>
        </Col>
        <Col className="paper_elevation " style={{ margin: ".5rem" }}>
          <Row
            className="p-3 text-white paper_elevation justify-content-end"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              background: "rgb(222 76 76)",
              borderBottomRightRadius: "60px",
            }}
          >
            <span className="mx-auto"> {t("DailySubs")}</span>
          </Row>
          <Row
            className="mt-1 mx-auto  justify-content-center align-items-center"
            style={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            <Col className="text-primary">
              <i className="fal fa-smile-plus"></i>
            </Col>
            <Col className="text-primary " style={{ fontSize: "1.7rem" }}>
              <span>{dailySubsInDay || 0}</span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ height: "40%" }}>
        <Col
          className="paper_elevation "
          style={{ background: "red", margin: ".5rem" }}
        >
          اى إشتراك افضل رسم بيانى للإشتراكات
        </Col>
        <Col
          className="paper_elevation "
          style={{ background: "green", margin: ".5rem" }}
        >
          رسم بيانى للمشتركين بالايام
        </Col>
      </Row>
      <Row style={{ height: "40%" }}>
        <Col
          className="paper_elevation "
          style={{ background: "yellow", margin: ".5rem" }}
        >
          قائمة بالمتأخرات
        </Col>
        <Col
          className="paper_elevation "
          style={{ background: "blue", margin: ".5rem" }}
        >
          قائمة بالإشتراكات المنتهية
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Dashboard;
