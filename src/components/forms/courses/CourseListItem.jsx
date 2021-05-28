import React, { useState } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import FormItem from "../FormItem";

const CourseListItem = ({
  editable,
  idx,
  option,
  setCoursesValues,
  coursesValues,
}) => {
  const { t } = useTranslation();
  const changeTableValues = (idx, key, value) => {
    coursesValues[idx]["value"][key] = value;
  };

  const [plan, setPlan] = useState({
    label: "شهرى",
    value: "شهرى",
  });

  const [period, setPeriod] = useState(1);

  return (
    <ListGroup.Item key={idx + 1}>
      <Row className="px-1">
        <Col>{option.value.name}</Col>
        <Col>{option.value.description}</Col>
        <Col>{option.value.monthlyPrice}</Col>
        {/* <Col>{option.value.minutesPerTime}</Col> */}
        {option && option.value.plan ? (
          <Col>{option.value.plan}</Col>
        ) : (
          <Col>{plan.value}</Col>
        )}
        <Col>
          {option.value && !option.value.membership ? (
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
          ) : option && option.value.period ? (
            option.value.period
          ) : (
            period
          )}
        </Col>
      </Row>
      {option.value.membership && (
        <Badge variant="info">{t("MemberShip")}</Badge>
      )}
    </ListGroup.Item>
  );
};

export default CourseListItem;
