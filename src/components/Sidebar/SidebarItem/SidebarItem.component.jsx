import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SidebarSubItem from "../SidebarSubItem/SidebarSubItem.component";
import { ItemHeaderContainer, TitleContainer } from "./sidebaritem.styles";
const SidebarItem = ({ title, icon, url, subitems }) => {
  const { t, i18n } = useTranslation();

  return (
    <Container className="sidebar-item">
      <ItemHeaderContainer>
        <TitleContainer>
          {
            // show the icon from the file
            icon
          }
          <span className="px-2">{t(title)}</span>
        </TitleContainer>
        {subitems && <i className="px-2 fas fa-chevron-down"></i>}
      </ItemHeaderContainer>
      {subitems && (
        <div className="subitems-menu">
          <SidebarSubItem subitems={subitems} />
        </div>
      )}
    </Container>
  );
};

export default SidebarItem;
