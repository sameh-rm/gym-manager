import React, { useEffect, useState } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import FormItem from "../FormItem";

const CourseListItem = ({
  editable,
  idx,
  option,
  membership,
  setCoursesValues,
  coursesValues,
}) => {
  const { t } = useTranslation();
  const changeTableValues = (idx, key, value) => {
    if (Array.isArray(coursesValues)) {
      coursesValues[idx]["value"][key] = value;
    } else {
      coursesValues["value"][key] = value;
    }
  };
  const options = [
    { value: "شهرى", label: "شهرى" },
    { value: "يومى", label: "يومى" },
  ];
  const plan = {
    label: "شهرى",
    value: "شهرى",
  };
  const [period, setPeriod] = useState(1);
  return (
    <ListGroup.Item key={idx + 1}>
      {option.value && (
        <Row className="px-1">
          <Col>{option.value.name}</Col>
          <Col>{option.value.description}</Col>
          <Col>{option.value.daysPerMonth}</Col>
          <Col>{option.value.minutesPerTime}</Col>
          {option && option.value.plan ? (
            <Col>{option.value.plan}</Col>
          ) : (
            <Col>{plan.value}</Col>
          )}
          {editable && option.value && !option.value.membership ? (
            <Col>
              <FormItem
                value={
                  option && option.value.period
                    ? option.value.period
                    : period || 1
                }
                placeholder={t("Period")}
                onChangeHandler={(e) => {
                  changeTableValues(idx, "period", e);
                  setCoursesValues([...coursesValues]);
                  setPeriod(e);
                }}
                required
                type="number"
                key="period"
              />
            </Col>
          ) : (
            <Col>
              {option.value && option.value.membership
                ? membership.period
                : period || option.value.period}
            </Col>
          )}
        </Row>
      )}
      {option.value && option.value.membership && (
        <Badge variant="info">{t("MemberShip")}</Badge>
      )}
    </ListGroup.Item>
  );
};

export default CourseListItem;
