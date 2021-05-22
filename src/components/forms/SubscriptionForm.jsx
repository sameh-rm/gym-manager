import React, { useEffect, useMemo, useState } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Select from "react-select";
import {
  coursesToOptions,
  optionsToMemberShipCourses,
} from "../../redux/courseReducers/utils";
import AsyncComponent from "../Utils/AsyncComponent";
import CourseListItem from "./courses/CourseListItem";
import FormContainer from "./FormContainer";
import FormItem from "./FormItem";

const SubscriptionForm = ({
  membershipsAsOptions,
  membershipLoading,
  membershipError,
  coursesAsOptions,
  courseLoading,
  courseError,
  coursesValues,
  setCoursesValues,
  membershipValue,
  setMembershipValues,
  options,
  type,
  setType,
  option,
  setOption,
  handleSubmit,
  value,
  setValue,
}) => {
  const { t } = useTranslation();
  const valueValidation = (e) => {
    console.log(e, membershipValue.price);
    if (Number(e) > Number(membershipValue.price)) {
      setValue(membershipValue.price);
    } else {
      setValue(Number(e));
    }
  };
  useEffect(() => {
    if (option && type.value === options[1].value) {
      setCoursesValues([option]);
    } else {
      option &&
        setCoursesValues([
          ...coursesToOptions(optionsToMemberShipCourses(option.value)),
        ]);
    }
  }, [type, option]);
  return (
    <>
      <FormContainer fullSize>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="Type">
                <Form.Label>{t("Subscription Type")}</Form.Label>
                <Select
                  options={options}
                  value={type}
                  menuPosition="fixed"
                  placeholder={t("Select Type")}
                  required
                  onChange={(e) => {
                    setType(e);
                    setOption(e.value.courses || []);
                  }}
                />
              </Form.Group>
              {type.value && (
                <Form.Group controlId={type.value}>
                  <Form.Label>
                    {type === "Course" ? t("Courses") : t("Memberships")}
                  </Form.Label>
                  <Select
                    options={
                      type.value === options[0].value
                        ? membershipsAsOptions
                        : coursesAsOptions
                    }
                    required
                    value={option}
                    menuPosition="fixed"
                    placeholder={`${t("Select")} ${type.label}`}
                    onChange={(e) => {
                      console.log(e);
                      setMembershipValues(e.value);
                      setOption(e);
                    }}
                  />
                </Form.Group>
              )}
            </Col>
            <Col md={6}>
              <Row>
                <Col className="pb-4">{t("Price")} : </Col>
                <Col className="pb-4">{membershipValue.price || 0}</Col>
              </Row>
              <Row>
                <Col>{t("Paid")} : </Col>
                <Col>{membershipValue.paid || 0}</Col>
              </Row>
              <FormItem
                required
                className="mt-5"
                placeholder={t("Paid Value")}
                onChangeHandler={valueValidation}
                value={value}
              />
            </Col>
          </Row>
        </Form>
      </FormContainer>
      <AsyncComponent
        loading={membershipLoading || courseLoading}
        error={membershipError || courseError}
      />
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
          <ListGroup.Item disabled>{t(type.value)}</ListGroup.Item>
        ) : (
          coursesValues.map((option, idx) => {
            return (
              <CourseListItem
                key={idx + 1}
                idx={idx}
                option={option}
                setCoursesValues={setCoursesValues}
                coursesValues={coursesValues}
                editable={type.value === options[1].value}
                membership={membershipValue}
              />
            );
          })
        )}
      </ListGroup>
    </>
  );
};

export default SubscriptionForm;
