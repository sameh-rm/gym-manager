import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  selectSubItem,
  setItemHeigt,
} from "../../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import { useDispatch } from "react-redux";
import "./sidebarSubitem.styles.scss";
import { ItemContainer, SubMenuContainer } from "./sidebarSubItem.styles";
import { LinkContainer } from "react-router-bootstrap";

const SubItem = ({ idx, parentItem, item }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectionHandler = () =>
    dispatch(selectSubItem(parentItem, item.title));
  return item.url ? (
    <LinkContainer to={item.url}>
      <ItemContainer
        selected={item.selected}
        onClick={selectionHandler}
        className="item py-2 mb-1 px-2"
      >
        <div className="iconContainer">
          {
            // show the icon from the file
            item.icon
          }
        </div>
        <span className="px-2 w-100" style={{ verticalAlign: "middle" }}>
          {t(item.title)}
        </span>
      </ItemContainer>
    </LinkContainer>
  ) : (
    <ItemContainer
      selected={item.selected}
      onClick={selectionHandler}
      className="item py-2 mb-1 px-2"
    >
      <div className="iconContainer">
        {
          // show the icon from the file
          item.icon
        }
      </div>
      <span className="px-2 w-100" style={{ verticalAlign: "middle" }}>
        {t(item.title)}
      </span>
    </ItemContainer>
  );
};

const SidebarSubItem = ({ parentTitle, height, expanded, subitems }) => {
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
            <SubItem
              key={idx + 1}
              parentItem={parentTitle}
              item={item}
              idx={idx}
            />
          ) : (
            <hr
              key={idx + 1}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.5)",
                width: "100%",
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
