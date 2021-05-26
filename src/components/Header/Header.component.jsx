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
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const collapse = useSelector((state) => state.core.sidenav.collapse);
  const [userInfoExpanded, setUserInfoExpanded] = useState(false);
  const [alarmMenuExpanded, setAlarmMenuExpanded] = useState(false);
  const [unConfirmedMenuExpanded, setUnConfirmedMenuExpanded] = useState(false);
  const { listUnConfirmed } = useSelector(
    (state) => state.expinc.listUnConfirmed
  );
  const [total, setTotal] = useState(0);
  useEffect(() => {
    dispatch(listAllUnConfirmed());
  }, [dispatch]);
  useEffect(() => {
    setTotal(
      listUnConfirmed &&
        listUnConfirmed.reduce((accu, expinc) => accu + expinc.value, 0)
    );
  }, [listUnConfirmed]);
  const expandHandler = (target) => {
    switch (target) {
      case "userInfo":
        setUserInfoExpanded(!userInfoExpanded);
        break;
      case "alarm":
        setAlarmMenuExpanded(!alarmMenuExpanded);
        break;
      case "unConfirmedMenu":
        setUnConfirmedMenuExpanded(!alarmMenuExpanded);
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

        <div
          className="float-left relative "
          onClick={() => expandHandler("unConfirmedMenu")}
        >
          <Badge variant="danger">
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
            bg_color="rgb(171, 13, 13, 50%)"
          >
            {listUnConfirmed && listUnConfirmed.length === 0 ? (
              <h4>{t("No records to display")}</h4>
            ) : (
              <Table hover>
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
