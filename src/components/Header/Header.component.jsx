import React, { useEffect } from "react";
import { useState } from "react";
import { Badge, Col, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../redux/coreReducers/adminReducers/admin.actions";
import { listAllUnConfirmed } from "../../redux/expincReducers/expinc.actions";
import {
  navCollapse,
  selectItem,
} from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import CustomMenu from "../CustomeMenu/CustomMenu";
import { BrandContainer } from "./Header.styles";
import "./header.styles.scss";
import { formatDate } from "../../utils/utils";
import DailySubscriptionModal from "../forms/subscription/DailySubscriptionModal";
import { Link } from "react-router-dom";
import {
  listAllExpiredSubscriptions,
  listAllUnpaidSubscriptions,
} from "../../redux/subscriptionsReducers/subscriptions.actions";
const Header = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const collapse = useSelector((state) => state.core.sidenav.collapse);
  const [userInfoExpanded, setUserInfoExpanded] = useState(false);
  const [unpaidMenuExpanded, setUnpaidMenuExpanded] = useState(false);
  const [unConfirmedMenuExpanded, setUnConfirmedMenuExpanded] = useState(false);
  const [expiredSubsMenuExpanded, setExpiredSubsMenuExpanded] = useState(false);
  const { listUnConfirmed } = useSelector(
    (state) => state.expinc.listUnConfirmed
  );
  const { expiredSubscriptionList } = useSelector(
    (state) => state.subscription.listAllExpiredSubs
  );

  const { unpaidSubscriptionList } = useSelector(
    (state) => state.subscription.listAllUnpaidSubs
  );

  const [total, setTotal] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  useEffect(() => {
    dispatch(listAllUnConfirmed());
    dispatch(listAllExpiredSubscriptions());
    dispatch(listAllUnpaidSubscriptions());
  }, [dispatch]);
  useEffect(() => {
    setTotal(
      listUnConfirmed &&
        listUnConfirmed.reduce((accu, expinc) => accu + expinc.value, 0)
    );
    setTotalUnpaid(
      unpaidSubscriptionList &&
        unpaidSubscriptionList.reduce(
          (accu, sub) => accu + sub.price - sub.paid,
          0
        )
    );
  }, [listUnConfirmed, unpaidSubscriptionList]);
  const expandHandler = (target) => {
    switch (target) {
      case "userInfo":
        setUserInfoExpanded(!userInfoExpanded);
        break;
      case "expiredMenu":
        setExpiredSubsMenuExpanded(!expiredSubsMenuExpanded);
        break;
      case "unPaidSubsMenu":
        setUnpaidMenuExpanded(!unpaidMenuExpanded);
        break;
      case "unConfirmedMenu":
        setUnConfirmedMenuExpanded(!unConfirmedMenuExpanded);
        break;
      default:
        break;
    }
  };
  const collapseHandler = (e) => {
    dispatch(navCollapse());
  };
  const homeHandler = () => {
    dispatch(selectItem("Dashboard"));
    history.push("/");
  };

  return (
    <header>
      <div className="navbar flex paper_elevation">
        <div>
          <BrandContainer
            dir={i18n.dir()}
            className="brand flex text-center"
            collapse={collapse}
          >
            {/* <i className="fab fa-gitlab pb-2 m-auto px-5"></i> */}

            <h3 className="mx-2 title" onClick={homeHandler}>
              <span style={{ color: "#1fe086" }}>Gym</span> <span>Manager</span>
            </h3>

            <div className="burger px-2 mx-2 " onClick={collapseHandler}>
              <i className="fas fa-bars"></i>
            </div>
          </BrandContainer>
        </div>
        <DailySubscriptionModal />

        <div
          className="float-left relative "
          onClick={() => expandHandler("unConfirmedMenu")}
        >
          <Badge variant="info">
            {listUnConfirmed ? listUnConfirmed.length : 0}
          </Badge>
          <span className="pointer"> {t("UnConfirmedSubs")}</span>
          <i className="fal fa-th-list px-2"></i>
          <CustomMenu
            expand={unConfirmedMenuExpanded}
            expandHandler={setUnConfirmedMenuExpanded}
            header={
              <h4>
                <span> {t("UnConfirmedSubs")}</span>{" "}
                <span style={{ textDecoration: "underline" }}>
                  {" "}
                  ({total}) {t("$")}
                </span>
              </h4>
            }
            footer={
              <Row>
                <Col>
                  {t("Total")} :
                  <span style={{ textDecoration: "underline" }}>
                    {" "}
                    ({total}) {t("$")}
                  </span>
                </Col>
                <Col>
                  <Link to="/expenses/unconfirmed">{t("Show All")}</Link>
                </Col>
              </Row>
            }
            size="lg"
            bg_color="rgb(181, 14, 130, 50%)"
          >
            {listUnConfirmed && listUnConfirmed.length === 0 ? (
              <h4>{t("No records to display")}</h4>
            ) : (
              <Table hover style={{ fontSize: "0.8rem" }}>
                <thead>
                  <tr>
                    <th>{t("Type")}</th>
                    <th>{t("Value")}</th>
                    <th>{t("CreatedAt")}</th>
                  </tr>
                </thead>
                <tbody>
                  {listUnConfirmed &&
                    listUnConfirmed.map((expinc, idx) => (
                      <tr className="pointer" key={idx}>
                        <td>{t(expinc.subscription.type)}</td>
                        <td>
                          {expinc.value} {t("$")}
                        </td>
                        <td>{formatDate(expinc.createdAt)}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </CustomMenu>
        </div>

        <div
          className="float-left relative "
          onClick={() => expandHandler("expiredMenu")}
        >
          <Badge variant="danger">
            {expiredSubscriptionList ? expiredSubscriptionList.length : 0}
          </Badge>
          <span className="pointer"> {t("expiredMenu")}</span>
          <i className="far fa-exclamation px-2"></i>
          <CustomMenu
            expand={expiredSubsMenuExpanded}
            expandHandler={setExpiredSubsMenuExpanded}
            header={
              <h4>
                <span> {t("expiredMenu")}</span>{" "}
                <span style={{ textDecoration: "underline" }}>
                  {" "}
                  (
                  {expiredSubscriptionList ? expiredSubscriptionList.length : 0}
                  )
                </span>
              </h4>
            }
            footer={
              <Row>
                <Col>
                  {t("Count")} :
                  <span style={{ textDecoration: "underline" }}>
                    {" "}
                    ({expiredSubsMenuExpanded.length || 0})
                  </span>
                </Col>
                <Col>
                  <Link to="/subscriptions/expired">{t("Show All")}</Link>
                </Col>
              </Row>
            }
            size="lg"
            bg_color="rgb(171, 13, 13, 50%)"
          >
            {expiredSubscriptionList && expiredSubscriptionList.length === 0 ? (
              <h4>{t("No records to display")}</h4>
            ) : (
              <Table hover style={{ fontSize: "0.8rem" }}>
                <thead>
                  <tr>
                    <th>{t("Type")}</th>
                    <th>{t("Name")}</th>
                    <th>{t("EndsAt")}</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "0.7rem" }}>
                  {expiredSubscriptionList &&
                    expiredSubscriptionList.map((subscription, idx) => (
                      <tr className="pointer" key={idx}>
                        <td>{t(subscription.type)}</td>
                        <td>
                          {subscription.member
                            ? subscription.member.name
                            : subscription.dailyMember || ""}
                        </td>
                        <td>{formatDate(subscription.endsAt)}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </CustomMenu>
        </div>
        <div
          className="float-left relative "
          onClick={() => expandHandler("unPaidSubsMenu")}
        >
          <Badge variant="warning">
            {unpaidSubscriptionList ? unpaidSubscriptionList.length : 0}
          </Badge>
          <span className="pointer"> {t("unPaidSubsMenu")}</span>
          <i className="far fa-money-bill-wave px-2"></i>
          <CustomMenu
            expand={unpaidMenuExpanded}
            expandHandler={setUnpaidMenuExpanded}
            header={
              <h4>
                <span> {t("unPaidSubsMenu")}</span>{" "}
                <span style={{ textDecoration: "underline" }}>
                  {" "}
                  ({total}) {t("$")}
                </span>
              </h4>
            }
            footer={
              <Row>
                <Col>
                  {t("Total")} :
                  <span style={{ textDecoration: "underline" }}>
                    {" "}
                    ({totalUnpaid}) {t("$")}
                  </span>
                </Col>
                <Col>
                  <Link to="/subscriptions/unpaid">{t("Show All")}</Link>
                </Col>
              </Row>
            }
            size="lg"
            bg_color="rgb(222, 149, 97, 50%)"
          >
            {unpaidSubscriptionList && unpaidSubscriptionList.length === 0 ? (
              <h4>{t("No records to display")}</h4>
            ) : (
              <Table hover style={{ fontSize: "0.8rem" }}>
                <thead>
                  <tr>
                    <th>{t("Type")}</th>
                    <th>{t("Name")}</th>
                    <th>{t("EndsAt")}</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "0.7rem" }}>
                  {unpaidSubscriptionList &&
                    unpaidSubscriptionList.map((subscription, idx) => (
                      <tr className="pointer" key={idx}>
                        <td>{t(subscription.type)}</td>
                        <td>
                          {subscription.member
                            ? subscription.member.name
                            : subscription.dailyMember || ""}
                        </td>
                        <td>{formatDate(subscription.endsAt)}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </CustomMenu>
        </div>
        <div
          className="float-left relative "
          onClick={() => expandHandler("userInfo")}
        >
          <span className="pointer"> UserInfo</span>
          <i className="fas fa-user px-2"> </i>
          <CustomMenu
            expand={userInfoExpanded}
            expandHandler={setUserInfoExpanded}
            header={<h4>{t("UserInfo")}</h4>}
            size="sm"
          >
            <Col className="w-100">
              <Row className="pointer" onClick={() => dispatch(logout())}>
                Logout
              </Row>
            </Col>
          </CustomMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
