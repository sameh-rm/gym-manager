import React, { useEffect, useState } from "react";
import { Col, Image, ListGroup, Row, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { initMember } from "../../../redux/memberReducers/member.actions";
import FormItem from "../../forms/FormItem";
import AsyncComponent from "../../Utils/AsyncComponent";

const ReviewForm = () => {
  const { t } = useTranslation();
  const {
    memberToCreate: member,
    loading,
    success,
    error,
  } = useSelector((state) => state.member.addMember);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [payment, setPayment] = useState(0);
  useEffect(() => {
    setTotal(
      member.courses
        ? member.courses.reduce((accu, course) => accu + course.price, 0)
        : 0
    );
    console.log(total);
  }, [member]);
  return (
    <Row>
      <AsyncComponent error={error} loading={loading} />
      <Col md={8}>
        <Row>
          <Col md={6}>
            {t("Name")}: <span className="text-black-50">{member.name}</span>
          </Col>
          <Col md={6}>
            {t("Membership")}:{" "}
            <span className="text-black-50">
              {member.memberships ? member.memberships[0].name : t("None")}
            </span>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col md={4}>
            {t("Age")}: <span className="text-black-50">{member.age}</span>
          </Col>
          <Col md={4}>
            {t("Tall")}: <span className="text-black-50">{member.tall}</span>
          </Col>
          <Col md={4}>
            {t("Weight")}:{" "}
            <span className="text-black-50">{member.weight}</span>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col>
            {t("Address")}:{" "}
            <span className="text-black-50">{member.address}</span>
          </Col>
          <Col>
            {t("City")}: <span className="text-black-50">{member.city}</span>
          </Col>
          <Col>
            {t("Center")}:<span className="text-black-50">{member.center}</span>
          </Col>
          <Col>
            {t("Governorate")}:
            <span className="text-black-50">{member.governorate}</span>
          </Col>
        </Row>
        <Row className="pt-5">
          <ListGroup className="w-100">
            <ListGroup.Item disabled>
              <Row className="px-1">
                <Col>{t("Name")}</Col>
                <Col md={3}>{t("Description")}</Col>
                <Col>{t("DaysPerMonth")}</Col>
                <Col>{t("MinutesPerTime")}</Col>
                <Col>{t("Plan")}</Col>
                <Col>{t("Period")}</Col>
                <Col>{t("Price")}</Col>
              </Row>
            </ListGroup.Item>
            {!member.courses || member.courses.length === 0 ? (
              <ListGroup.Item disabled>No Courses</ListGroup.Item>
            ) : (
              member.courses &&
              member.courses.map((course, idx) => {
                console.log(idx);
                return (
                  <ListGroup.Item key={idx + 1}>
                    <Row className="px-1">
                      <Col>{course.name}</Col>
                      <Col md={3}>{course.description}</Col>
                      <Col>{course.daysPerMonth}</Col>
                      <Col>{course.minutesPerTime}</Col>
                      <Col>{course.plan || "شهرى"}</Col>
                      <Col>{course.period || 1}</Col>
                      <Col>{course.price || course.monthlyPrice}</Col>
                    </Row>
                    {course.membership && (
                      <Badge variant="info">{t("MemberShip")}</Badge>
                    )}
                  </ListGroup.Item>
                );
              })
            )}
            <ListGroup.Item disabled>
              <Row className="px-1">
                <Col md={8}></Col>
                <Col md={2}>{t("Total")}:</Col>
                <Col md={2}>
                  {total} {t("$")}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Col>
      <Col md={4}>
        <Row>
          <Image fluid src={member.image} alt={member.name} />
        </Row>
        <Row className="pt-5 px-5">
          <FormItem
            title={t("Payment")}
            value={payment}
            placeholder={t("Payment")}
            onChangeHandler={(value) => {
              setPayment(value);
              dispatch(
                initMember({
                  ...member,
                  paid: value,
                })
              );
            }}
            required
            type="number"
            key="payment"
          />
        </Row>
      </Col>
    </Row>
  );
};

export default ReviewForm;
