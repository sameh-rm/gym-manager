import React from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import {
  coursesToOptions,
  optionsToMemberShipCourses,
} from "../../../redux/courseReducers/utils";
import CourseListItem from "./CourseListItem";

const FormCoursesMenu = ({
  title,
  maxHeight,
  coursesValues,
  setCoursesValues,
  coursesAsOptions,
  membershipValue,
  setMembershipValues,
  membershipsAsOptions,
  editable,
  selectable,
  membership,
  membershipPart,
}) => {
  const { t } = useTranslation();
  return (
    <div style={{ maxHeight: maxHeight, overflow: "scroll" }}>
      <h3>{t(title || "Courses")}</h3>
      {membership && (
        <Form.Group controlId="Memberships">
          <Form.Label>{t("Memberships")}</Form.Label>
          <Select
            options={membershipsAsOptions}
            value={membershipValue}
            menuPosition="fixed"
            placeholder={t("Select Membership")}
            onChange={(e) => {
              setMembershipValues(e);
              setCoursesValues([
                ...coursesToOptions(optionsToMemberShipCourses(e.value)),
              ]);
            }}
          />
        </Form.Group>
      )}
      {membership
        ? membershipValue &&
          selectable && (
            <Form.Group controlId="Courses">
              <Form.Label>{t("Courses")}</Form.Label>
              <Select
                options={coursesAsOptions}
                value={coursesValues}
                isMulti
                menuPosition="fixed"
                placeholder={t("Select Courses")}
                filterOption={(option, raw) => {
                  const exist = coursesValues.find(
                    (o) => o.label === option.label
                  );
                  return exist ? undefined : option;
                }}
                onChange={(e) => {
                  setCoursesValues(e);
                }}
              />
            </Form.Group>
          )
        : selectable && (
            <Form.Group controlId="Courses">
              <Form.Label>{t("Courses")}</Form.Label>
              <Select
                options={coursesAsOptions}
                value={coursesValues}
                isMulti
                menuPosition="fixed"
                placeholder={t("Select Courses")}
                onChange={(e) => {
                  setCoursesValues(e);
                }}
              />
            </Form.Group>
          )}
      <ListGroup>
        <ListGroup.Item disabled>
          <Row>
            <Col>{t("Name")}</Col>
            <Col>{t("Description")}</Col>
            <Col>{t("DaysPerMonth")}</Col>
            <Col>{t("MinutesPerTime")}</Col>
            <Col>{t("Plan")}</Col>
            <Col>{t("Period")}</Col>
          </Row>
        </ListGroup.Item>
        {coursesValues.length === 0 ? (
          <ListGroup.Item disabled>{title}</ListGroup.Item>
        ) : (
          coursesValues.map((option, idx) => {
            return (
              <CourseListItem
                key={idx + 1}
                idx={idx}
                option={option}
                setCoursesValues={setCoursesValues}
                coursesValues={coursesValues}
                editable
                membership={membershipValue.value}
              />
            );
          })
        )}
      </ListGroup>
    </div>
  );
};

export default FormCoursesMenu;
