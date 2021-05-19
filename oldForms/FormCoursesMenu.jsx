import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CourseListItem from "./CourseListItem";

const FormCoursesMenu = ({
  title,
  maxHeight,
  coursesValues,
  setCoursesValues,
  editable,
}) => {
  const { t } = useTranslation();

  return (
    <div style={{ maxHeight: maxHeight, overflow: "scroll" }}>
      <h3>{t(title || "Courses")}</h3>
      <ListGroup>
        <ListGroup.Item disabled>
          <Row>
            <Col md={2}>{t("Name")}</Col>
            <Col md={2}>{t("Description")}</Col>
            <Col>{t("DaysPerMonth")}</Col>
            <Col>{t("MinutesPerTime")}</Col>
            <Col md={3}>{t("Plan")}</Col>
            <Col>{t("Period")}</Col>
          </Row>
        </ListGroup.Item>
        {coursesValues.length === 0 ? (
          <ListGroup.Item disabled>Select Some {title}</ListGroup.Item>
        ) : (
          coursesValues.map((option, idx) => {
            return (
              <CourseListItem
                key={idx + 1}
                idx={idx}
                option={option}
                setCoursesValues={setCoursesValues}
                coursesValues={coursesValues}
                editable={editable}
              />
            );
          })
        )}
      </ListGroup>
    </div>
  );
};

export default FormCoursesMenu;
