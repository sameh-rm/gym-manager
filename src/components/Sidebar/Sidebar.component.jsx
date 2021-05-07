import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarItem from "./SidebarItem/SidebarItem.component";
import "./sidebar.styles.scss";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarContainer } from "./sidebar.styles";
import ReactTooltip from "react-tooltip";
import {
  expandItem,
  navCollapse,
  selectItem,
} from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
const Sidebar = () => {
  const sidenav = useSelector((state) => state.core.sidenav);
  const sidebarItems = sidenav.sidebarItems;
  const collapse = useSelector((state) => state.core.sidenav.collapse);
  const history = useHistory();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    window.dir = i18n.dir();
  });
  return (
    <SidebarContainer
      collapse={collapse}
      className={`sidebar ${
        window.dir === "rtl" ? "elevation_rtl" : "elevation_ltr"
      }`}
    >
      <div className="sidebar_wrapper">
        {/* <hr style={{ borderTop: "1px solid white", width: "80%" }} /> */}
        <div className="body pt-4">
          {sidebarItems.map((item, idx) =>
            sidenav.collapse ? (
              <div key={idx + 1} className="m-2">
                <div
                  data-tip
                  data-for={item.title}
                  className="itemIconContainer"
                  onClick={() => {
                    dispatch(expandItem(item.title));
                    dispatch(selectItem(item.title));
                    dispatch(navCollapse());
                  }}
                >
                  {item.icon}
                </div>
                <ReactTooltip
                  id={item.title}
                  type="dark"
                  effect="solid"
                  place={i18n.dir() === "rtl" ? "left" : "right"}
                >
                  <span>{item.title}</span>
                </ReactTooltip>
              </div>
            ) : (
              <SidebarItem
                history={history}
                key={idx + 1}
                eventKey={idx}
                title={item.title}
                icon={item.icon}
                url={item.url}
                subitems={item.subitems}
                expanded={item.expanded}
                selected={item.selected}
                height={item.height}
              />
            )
          )}
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
