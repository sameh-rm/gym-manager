import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { setItemHeigt } from "../../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import { useDispatch, useSelector } from "react-redux";
import "./sidebarSubitem.styles.scss";
import { SubMenuContainer } from "./sidebarSubItem.styles";

const SidebarSubItem = ({ parentTitle, height, expanded, subitems }) => {
  const { t } = useTranslation();
  const itemRef = useRef();
  // const sidenav = useSelector((state) => state.sidenav);
  const dispatch = useDispatch();
  useEffect(() => {
    if (itemRef && itemRef.current.offsetHeight > 0 && !height) {
      dispatch(
        setItemHeigt({
          title: parentTitle,
          height: itemRef.current.offsetHeight,
        })
      );
    }
  }, [dispatch, parentTitle, itemRef, height]);
  return (
    <SubMenuContainer
      className="px-4"
      ref={itemRef}
      expanded={expanded}
      height={height}
    >
      <Container className="menu-container">
        {subitems.map((item, idx) =>
          item.title !== "_" ? (
            <div key={idx + 1} className="item py-2 px-2">
              <div className="iconContainer">
                {
                  // show the icon from the file
                  item.icon
                }
              </div>
              <span className="px-2 w-100">{t(item.title)}</span>
            </div>
          ) : (
            <hr
              key={idx + 1}
              style={{
                borderTop: "1px solid white",
                width: "90%",
                margin: "5px 0",
              }}
            />
          )
        )}
      </Container>
    </SubMenuContainer>
  );
};

export default SidebarSubItem;
