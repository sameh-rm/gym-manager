import React, { useEffect } from "react";
import { Badge, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  memberCourses,
  optionsToCourses,
} from "../../redux/courseReducers/utils";
import FormItem from "../forms/FormItem";

const ReviewScreen = ({
  coursesValues,
  membershipValue,
  name,
  image,
  age,
  nationalId,
  phone,
  tall,
  weight,
  address,
  city,
  center,
  governorate,
  total,
  setTotal,
  payment,
  setPayment,
}) => {
  const { t } = useTranslation();
  const membership = membershipValue && membershipValue.value;
  const courses = memberCourses(optionsToCourses(coursesValues), []);
  const subTotal = courses
    ? courses.reduce((accu, course) => {
        return course.membership ? accu : Number(accu) + Number(course.price);
      }, 0)
    : 0;
  useEffect(() => {
    if (membership) setTotal(subTotal + membership.price);
    else setTotal(subTotal);
    setPayment(total);
  }, [coursesValues, total, setTotal, subTotal, membership]);
  return (
    <Row>
      <Col md={8}>
        <Row>
          <Col md={6}>
            {t("Name")}: <span className="text-success">{name}</span>
          </Col>
          <Col md={6}>
            {t("Membership")}:{" "}
            <span className="text-success">
              {membership ? membership.name : t("None")}
            </span>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col md={6}>
            {t("NationalId")}:{" "}
            <span className="text-success">{nationalId}</span>
          </Col>
          <Col md={6}>
            {t("Phone")}: <span className="text-success">{phone}</span>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col md={4}>
            {t("Age")}: <span className="text-success">{age}</span>
          </Col>
          <Col md={4}>
            {t("Tall")}: <span className="text-success">{tall}</span>
          </Col>
          <Col md={4}>
            {t("Weight")}: <span className="text-success">{weight}</span>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col>
            {t("Address")}: <span className="text-success">{address}</span>
          </Col>
          <Col>
            {t("City")}: <span className="text-success">{city}</span>
          </Col>
          <Col>
            {t("Center")}: <span className="text-success">{center}</span>
          </Col>
          <Col>
            {t("Governorate")}:
            <span className="text-success">{governorate}</span>
          </Col>
        </Row>
        <Row className="pt-5">
          <ListGroup className="w-100">
            <ListGroup.Item disabled>
              <Row className="px-1">
                <Col>{t("Name")}</Col>
                <Col md={3}>{t("Description")}</Col>
                <Col>{t("Price")}</Col>
                {/* <Col>{t("MinutesPerTime")}</Col> */}
                <Col>{t("Plan")}</Col>
                <Col>{t("Period")}</Col>
                <Col>{t("SubTotal")}</Col>
              </Row>
            </ListGroup.Item>
            {!courses || courses.length === 0 ? (
              <ListGroup.Item disabled>No Courses</ListGroup.Item>
            ) : (
              courses &&
              courses.map((course, idx) => {
                return (
                  <ListGroup.Item key={idx + 1}>
                    <Row className="px-1">
                      <Col>{course.name}</Col>
                      <Col md={3}>{course.description}</Col>
                      <Col>{course.monthlyPrice}</Col>
                      {/* <Col>{course.minutesPerTime}</Col> */}
                      <Col>{course.plan || "شهرى"}</Col>
                      <Col>
                        {course.membership
                          ? membership.period
                          : course.period || 1}
                      </Col>
                      <Col>
                        {course.membership
                          ? "..."
                          : course.price || course.monthlyPrice}
                      </Col>
                    </Row>
                    {course.membership && (
                      <Badge variant="info">{t("MemberShip")}</Badge>
                    )}
                  </ListGroup.Item>
                );
              })
            )}
            <ListGroup.Item disabled>
              <Row className="px-1" md={12}>
                {/* <Col md={2}></Col> */}
                <Col md={12}>
                  <Row>
                    {membership && (
                      <>
                        <Col>{t("Membership")}:</Col>
                        <Col>
                          <span>
                            {membership.price} {t("$")}
                          </span>
                        </Col>

                        {total - membership.price > 0 && (
                          <>
                            <Col>{t("Courses")}:</Col>
                            <Col>
                              <span>
                                {total - membership.price} {t("$")}
                              </span>
                            </Col>
                          </>
                        )}
                      </>
                    )}
                    <Col>{t("Total")}:</Col>
                    <Col>
                      <span>
                        {total} {t("$")}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Col>
      <Col md={4}>
        <Row>
          <Image fluid src={image} alt={name} />
        </Row>
        <Row className="pt-5 px-2">
          <FormItem
            className="md-12"
            title={t("Payment")}
            value={payment}
            placeholder={t("Payment")}
            onChangeHandler={(value) => {
              setPayment(value);
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

export default ReviewScreen;
