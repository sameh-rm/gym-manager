import React from "react";
import { Accordion, Card, ListGroup, Button, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./sidebarSubitem.styles.scss";

const SidebarSubItem = ({ eventKey, subitems }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="subitems-menu px-4 ">
      <Container>
        {subitems.map((item, idx) =>
          item.title !== "_" ? (
            <div key={idx + 1} className="item py-1 px-2">
              {
                // show the icon from the file
                item.icon
              }
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
    </div>
  );
};

export default SidebarSubItem;
