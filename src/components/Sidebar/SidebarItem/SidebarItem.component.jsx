import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import SidebarSubItem from "../SidebarSubItem/SidebarSubItem.component";
import {
  expandItem,
  selectItem,
} from "../../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import {
  IconContainer,
  ItemHeaderContainer,
  TitleContainer,
} from "./sidebaritem.styles";
import { LinkContainer } from "react-router-bootstrap";

const SidebarItem = ({
  title,
  icon,
  url,
  subitems,
  height,
  expanded,
  selected,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const expandHanlder = () => {
    dispatch(expandItem(title));
    url && dispatch(selectItem(title));
  };

  return (
    <Container className="sidebar-item">
      {url ? (
        <LinkContainer to={url}>
          <ItemHeaderContainer
            onClick={expandHanlder}
            expanded={expanded}
            direction={document.dir}
            selected={selected}
          >
            <TitleContainer>
              <IconContainer>
                {
                  // show the icon from the file
                  icon
                }
              </IconContainer>
              <span className="px-4" style={{ verticalAlign: "middle" }}>
                {t(title)}
              </span>
            </TitleContainer>
            {subitems && <i className="chev px-2 fas fa-chevron-down"></i>}
          </ItemHeaderContainer>
        </LinkContainer>
      ) : (
        <ItemHeaderContainer
          onClick={expandHanlder}
          expanded={expanded}
          direction={document.dir}
          selected={selected}
        >
          <TitleContainer>
            <IconContainer>
              {
                // show the icon from the file
                icon
              }
            </IconContainer>
            <span className="px-4" style={{ verticalAlign: "middle" }}>
              {t(title)}
            </span>
          </TitleContainer>
          {subitems && <i className="chev px-2 fas fa-chevron-down"></i>}
        </ItemHeaderContainer>
      )}

      {subitems && (
        <div className="subitems-menu">
          <SidebarSubItem
            onlyAdminAllowed
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
