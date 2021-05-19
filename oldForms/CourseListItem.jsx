import React, { useEffect, useState } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import FormItem from "./FormItem";

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
  const options = [
    { value: "شهرى", label: "شهرى" },
    { value: "يومى", label: "يومى" },
  ];
  const [plan, setPlan] = useState({
    label: "شهرى",
    value: "شهرى",
  });
  const [daysPerMonth, setDaysPerMonth] = useState();
  const [minutesPerTime, setMinutesPerTime] = useState();
  const [period, setPeriod] = useState(1);
  useEffect(() => {
    setCoursesValues([...coursesValues]);
  }, []);
  return (
    <ListGroup.Item key={idx + 1}>
      <Row className="px-1">
        <Col md={2}>{option.value.name}</Col>
        <Col md={2}>{option.value.description}</Col>
        <Col>
          {editable ? (
            <FormItem
              value={daysPerMonth || option.value.daysPerMonth}
              placeholder={t("DaysPerMonth")}
              onChangeHandler={(e) => {
                changeTableValues(idx, "daysPerMonth", e);
                setCoursesValues([...coursesValues]);
                setDaysPerMonth(e);
              }}
              type="number"
              key="period"
            />
          ) : (
            option.value.daysPerMonth
          )}
        </Col>
        <Col>
          {editable ? (
            <FormItem
              value={minutesPerTime || option.value.minutesPerTime}
              placeholder={t("MinutesPerTime")}
              onChangeHandler={(e) => {
                changeTableValues(idx, "minutesPerTime", e);
                setCoursesValues([...coursesValues]);
                setMinutesPerTime(e);
              }}
              type="number"
              key="minutesPerTime"
            />
          ) : (
            option.value.minutesPerTime
          )}
        </Col>
        <Col md={3}>
          {editable ? (
            <Select
              options={options}
              value={
                option && option.value.plan
                  ? {
                      label: option.value.plan,
                      value: option.value.plan,
                    }
                  : plan || {
                      label: "شهرى",
                      value: "شهرى",
                    }
              }
              menuPosition="fixed"
              placeholder={t("Select Plan")}
              onChange={(e) => {
                changeTableValues(idx, "plan", e.value);
                setCoursesValues([...coursesValues]);
                setPlan(e);
              }}
            />
          ) : option && option.value.plan ? (
            option.value.plan
          ) : (
            plan || "شهرى"
          )}
        </Col>
        <Col>
          {editable ? (
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
