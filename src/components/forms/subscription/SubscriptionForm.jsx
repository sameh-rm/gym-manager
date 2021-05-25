import React, { useEffect, useMemo, useState } from "react";
import { Badge, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { listAllCourses } from "../../../redux/courseReducers/course.actions";
import { listAllMemberShips } from "../../../redux/memberShipReducers/membership.actions";
import AsyncComponent from "../../Utils/AsyncComponent";
import FormItem from "../FormItem";
import { optionsToMemberShipCourses } from "../../../redux/courseReducers/utils";
const SubscriptionForm = ({ subscription, setsubscription }) => {
  const { t } = useTranslation();
  const subscriptionTypeOptions = useMemo(
    () => [
      {
        label: t("Membership"),
        value: "Membership",
      },
      {
        label: t("Course"),
        value: "Course",
      },
    ],
    [t]
  );

  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);

  const [paidValue, setPaidValue] = useState(0);
  const {
    coursesAsOptions,
    loading: coursesLoading,
    error: coursesError,
  } = useSelector((state) => state.course.coursesList);
  const {
    membershipsAsOptions,
    loading: membershipLoading,
    error: membershipError,
  } = useSelector((state) => state.membership.membershipsList);

  const [targetedOptions, setTargetedOptions] = useState([]);
  const validatePaidValue = (value) => {
    if (targetedValue.value.monthlyPrice) {
      targetedValue.value.price =
        targetedValue.value.monthlyPrice * periodValue;
    }
    if (Number(value) > Number(targetedValue.value.price)) {
      setPaidValue(targetedValue.value.price);
      setsubscription({
        ...targetedValue.value,
        paid: targetedValue.value.price,
        type: subscriptionType.value,
      });
    } else {
      setPaidValue(value);
      setsubscription({
        ...targetedValue.value,
        paid: value,
        type: subscriptionType.value,
      });
    }
  };

  const [subscriptionType, setSubscriptionType] = useState(
    subscriptionTypeOptions[0]
  );
  const [coursesData, setCoursesData] = useState([]);
  const [targetedValue, setTargetedValue] = useState({});
  const [periodValue, setPeriodValue] = useState(1);
  const [subtotal, setSubTotal] = useState(0);
  useEffect(() => {
    setTargetedOptions(
      subscriptionType.value === subscriptionTypeOptions[1].value
        ? coursesAsOptions
        : membershipsAsOptions
    );
  }, [
    subscriptionType,
    subscriptionTypeOptions,
    coursesAsOptions,
    membershipsAsOptions,
  ]);
  useEffect(() => {
    dispatch(listAllCourses());
    dispatch(listAllMemberShips());
  }, [dispatch]);

  useEffect(() => {
    if (targetedValue.value)
      if (subscriptionType.value === subscriptionTypeOptions[0].value) {
        setsubscription({
          ...targetedValue.value,
          coureses: targetedValue.value.courses || [targetedValue.value],
          type: subscriptionType.value,
          period: subscriptionType.value.period || periodValue,
          paid: paidValue,
        });
      } else {
        setsubscription({
          ...targetedValue.value,
          coureses: [targetedValue.value],
          paid: paidValue,
          price: targetedValue.value.monthlyPrice * periodValue,
          period: periodValue,
          type: subscriptionType.value,
        });
      }
  }, [targetedValue, paidValue]);

  return (
    <Container>
      <Col md={8} className="mx-auto">
        <Col>
          <Row>
            <Form.Group className="w-100" controlId="type">
              <Form.Label>{t("Type")}</Form.Label>
              <Select
                placeholder={t("Select Type")}
                options={subscriptionTypeOptions}
                value={subscriptionType}
                onChange={(option) => {
                  setSubscriptionType(option);
                }}
                menuPosition="fixed"
              />
            </Form.Group>
          </Row>
          {
            <Row>
              <Form.Group className="w-100" controlId="target">
                <Form.Label>{t("Subscription")}</Form.Label>
                <Select
                  options={targetedOptions}
                  value={targetedValue}
                  menuPosition="fixed"
                  onChange={(option) => {
                    const optionValue = option.value;
                    setTargetedValue(option);
                    if (optionValue.courses) {
                      setSubTotal(optionValue.price);
                      setCoursesData(optionsToMemberShipCourses(optionValue));
                    } else {
                      setSubTotal(optionValue.monthlyPrice * periodValue);
                      setCoursesData([optionValue]);
                    }
                  }}
                />
              </Form.Group>
            </Row>
          }
        </Col>

        <Col>
          <Row className="rounded bg-secondary paper_elevation text-center text-primary">
            <Col className="py-2">{t("Price")} : </Col>
            <Col className="py-2">
              {subtotal}
              {t("$")}
            </Col>
          </Row>

          <Row className="mt-3">
            <FormItem
              title={t("Paid")}
              type="Number"
              placeholder={t("Paid Value")}
              onChangeHandler={validatePaidValue}
              value={paidValue}
              required
            />
          </Row>
        </Col>
      </Col>
      <Row>
        <AsyncComponent
          loading={membershipLoading || coursesLoading}
          error={membershipError || coursesError}
        >
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>{t("Name")}</th>
                <th>{t("Description")}</th>
                <th>{t("Plan")}</th>
                <th>{t("Period")}</th>
                <th>{t("Price")}</th>
              </tr>
            </thead>
            <tbody>
              {coursesData.map((course, idx) => {
                return (
                  <tr key={idx + 1}>
                    <td>
                      {course.membership ? (
                        <>
                          <Badge variant="success">{t("Membership")}</Badge>{" "}
                          {course.name}
                        </>
                      ) : (
                        course.name
                      )}
                    </td>
                    <td>{course.description}</td>
                    <td>{course.plan || "شهرى"}</td>
                    <td>
                      {!course.membership ? (
                        <FormItem
                          placeholder={"Period"}
                          type="number"
                          value={periodValue}
                          onChangeHandler={(val) => {
                            setPeriodValue(val > 0 ? val : 1);

                            if (course.courses) {
                              setSubTotal(course.price * val);
                              setTargetedValue({
                                ...targetedValue,
                                price: course.price * val,
                              });
                            } else {
                              setSubTotal(course.monthlyPrice * val);
                              setTargetedValue({
                                ...targetedValue,
                                price: course.monthlyPrice * val,
                              });
                            }
                          }}
                        />
                      ) : (
                        course.period
                      )}
                    </td>
                    <td>{course.price || course.monthlyPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </AsyncComponent>
      </Row>
    </Container>
  );
};

export default SubscriptionForm;
