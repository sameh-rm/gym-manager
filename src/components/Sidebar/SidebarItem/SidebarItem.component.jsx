import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import SidebarSubItem from "../SidebarSubItem/SidebarSubItem.component";
import { expandItem } from "../../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import {
  IconContainer,
  ItemHeaderContainer,
  TitleContainer,
} from "./sidebaritem.styles";
const SidebarItem = ({
  title,
  icon,
  url,
  subitems,
  height,
  expanded,
  seleceted,
}) => {
  const { t } = useTranslation();
  const itemRef = useRef();
  const dispatch = useDispatch();
  const expandHanlder = () => {
    dispatch(expandItem(title));
  };
  return (
    <Container className="sidebar-item">
      <ItemHeaderContainer
        onClick={expandHanlder}
        expanded={expanded}
        direction={document.dir}
      >
        <TitleContainer>
          <IconContainer>
            {
              // show the icon from the file
              icon
            }
          </IconContainer>
          <span className="px-2">{t(title)}</span>
        </TitleContainer>
        {subitems && <i className="chev px-2 fas fa-chevron-down"></i>}
      </ItemHeaderContainer>
      {subitems && (
        <div className="subitems-menu">
          <SidebarSubItem
            parentTitle={title}
            height={height}
            expanded={expanded}
            subitems={subitems}
          />
        </div>
      )}
    </Container>
  );
};

export default SidebarItem;
