import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  addCourse,
  updateCourse,
} from "../../../redux/courseReducers/course.actions";
import { courseActionTypes } from "../../../redux/courseReducers/course.actionTypes";
import AsyncComponent from "../../Utils/AsyncComponent";
import FormContainer from "../FormContainer";
import FormItem from "../FormItem";

const CourseForm = ({ history }) => {
  const { id } = useParams();
  const { course: courseToEdit } = useSelector(
    (state) => state.course.selectCourse
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [daysPerMonth, setDaysPerMonth] = useState("");
  const [minutesPerTime, setMinutesPerTime] = useState("");
  const [isActive, setIsActive] = useState(
    courseToEdit ? courseToEdit.isActive : false
  );
  const { error, loading, success, createdCourse } = useSelector(
    (state) => state.course.addCourse
  );
  const { error: updateError, loading: updateLoading } = useSelector(
    (state) => state.course.updateCourse
  );

  const saveCourse = () => {
    dispatch(
      addCourse({
        name,
        description,
        dailyPrice,
        monthlyPrice,
        daysPerMonth,
        minutesPerTime,
      })
    );
  };

  const editCourse = () => {
    dispatch(
      updateCourse({
        id,
        name,
        description,
        dailyPrice,
        monthlyPrice,
        daysPerMonth,
        minutesPerTime,
        isActive,
      })
    );
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!courseToEdit) saveCourse();
    else editCourse();
    history.push("/courses");
  };

  useEffect(() => {
    if ((success && createdCourse) || courseToEdit) {
      setName(courseToEdit ? courseToEdit.name : "");
      setDescription(courseToEdit ? courseToEdit.description : "");
      setDailyPrice(courseToEdit ? courseToEdit.dailyPrice : 5);
      setMonthlyPrice(courseToEdit ? courseToEdit.monthlyPrice : 75);
      setDaysPerMonth(courseToEdit ? courseToEdit.daysPerMonth : 26);
      setMinutesPerTime(courseToEdit ? courseToEdit.minutesPerTime : 60);
    }
    return () => {
      dispatch({ type: courseActionTypes.RESET_COURSE_FORM });
      dispatch({ type: courseActionTypes.RESET_ADD_COURSE_FORM });
    };
  }, [dispatch, id, courseToEdit, success, createdCourse]);

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <FormItem
              title={t("Name")}
              value={name}
              placeholder={t("Name")}
              onChangeHandler={setName}
              required
              type="text"
              key="name"
            />
          </Col>
          {id && courseToEdit && (
            <Col md={2}>
              <Form.Group controlId="IsActive" style={{ paddingTop: "2.4rem" }}>
                <Form.Check
                  custom
                  label={t("IsActive")}
                  checked={courseToEdit.isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </Form.Group>
            </Col>
          )}
        </Row>
        <FormItem
          title={t("Description")}
          value={description}
          placeholder={t("Description")}
          onChangeHandler={setDescription}
          required
          type="text"
          key="description"
        />
        <Row>
          <Col>
            <FormItem
              title={t("Day Subscription")}
              value={dailyPrice}
              placeholder={t("Day Subscription")}
              onChangeHandler={setDailyPrice}
              required
              type="text"
              key="dailyPrice"
            />
          </Col>
          <Col>
            <FormItem
              title={t("Month Subscription")}
              value={monthlyPrice}
              placeholder={t("Month Subscription")}
              onChangeHandler={setMonthlyPrice}
              required
              type="text"
              key="monthlyPrice"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem
              title={t("DaysPerMonth")}
              value={daysPerMonth}
              placeholder={t("DaysPerMonth")}
              onChangeHandler={setDaysPerMonth}
              required
              type="text"
              key="dailyPrice"
            />
          </Col>
          <Col>
            <FormItem
              title={t("MinutesPerVisit")}
              value={minutesPerTime}
              placeholder={t("MinutesPerVisit")}
              onChangeHandler={setMinutesPerTime}
              required
              type="text"
              key="monthlyPrice"
            />
          </Col>
        </Row>

        <AsyncComponent
          error={error || updateError}
          loading={loading || updateLoading}
        />
        <Button type="submit" className="float-left btn-success px-4 py-2 mb-4">
          {t("Submit")}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CourseForm;
