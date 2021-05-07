import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  navCollapse,
  selectItem,
} from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import CustomMenu from "../CustomeMenu/CustomMenu";
import { BrandContainer } from "./Header.styles";
import "./header.styles.scss";
const Header = () => {
  const { i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const collapse = useSelector((state) => state.core.sidenav.collapse);
  const [userInfoExpanded, setUserInfoExpanded] = useState(false);
  const [alarmMenuExpanded, setAlarmMenuExpanded] = useState(false);
  const expandHandler = (target) => {
    switch (target) {
      case "userInfo":
        setUserInfoExpanded(!userInfoExpanded);
        break;
      case "alarm":
        setAlarmMenuExpanded(!alarmMenuExpanded);
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
        <div onClick={homeHandler}>
          <BrandContainer
            dir={i18n.dir()}
            className="brand flex text-center"
            collapse={collapse}
          >
            <CustomMenu header="first" size="lg" />

            {/* <i className="fab fa-gitlab pb-2 m-auto px-5"></i> */}

            <h3 className="mx-2 title">
              <span style={{ color: "#1fe086" }}>Gym</span> <span>Manager</span>
            </h3>

            <div className="burger px-2 mx-2" onClick={collapseHandler}>
              <i className="fas fa-bars">
                <CustomMenu header="burger" size="md" />
              </i>
            </div>
          </BrandContainer>
        </div>

        <div
          className="float-left relative pointer"
          onClick={() => expandHandler("userInfo")}
        >
          UserInfo
          <i className="fas fa-user"> </i>
          <CustomMenu
            expand={userInfoExpanded}
            expandHandler={setUserInfoExpanded}
            header={<h3>left</h3>}
            size="lg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
