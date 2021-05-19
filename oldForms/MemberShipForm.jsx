import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormContainer from "../../forms/FormContainer";
import FormItem from "../../forms/FormItem";
import Message from "../../Message";
import AsyncComponent from "../../Utils/AsyncComponent";
import {
  addMembership,
  updateMemberShip,
} from "../../../redux/memberShipReducers/membership.actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Select from "react-select";
import { listAllCourses } from "../../../redux/courseReducers/course.actions";

const MembershipForm = ({
  history,
  coursesAsOptions,
  coursesValues,
  setCoursesValues,
  fullSize,
}) => {
  const { id } = useParams();
  const { membership: membershipToEdit } = useSelector(
    (state) => state.membership.selectMembership
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [period, setPeriod] = useState(1);
  const [isActive, setIsActive] = useState(
    membershipToEdit ? membershipToEdit.isActive : false
  );
  useEffect(() => {
    dispatch(listAllCourses());
  }, [dispatch]);

  const { error, loading, success, createdMembership } = useSelector(
    (state) => state.membership.addMembership
  );
  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = useSelector((state) => state.membership.updateMembership);

  const saveMembership = () => {
    dispatch(
      addMembership({
        name,
        description,
        price,
        period,
        coursesValues,
      })
    );
  };
  const editMembership = () => {
    dispatch(
      updateMemberShip({
        id,
        name,
        description,
        price,
        period,
        isActive,
        coursesValues,
      })
    );
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!membershipToEdit) saveMembership();
    else editMembership();
  };
  useEffect(() => {
    if (success || updateSuccess) {
      history.push("/memberships");
      dispatch({ type: "RESET_SELECT_MEMBERSHIP" });
    }
  }, [dispatch, success, updateSuccess, history]);

  useEffect(() => {
    if ((success && createdMembership) || membershipToEdit) {
      setName(membershipToEdit ? membershipToEdit.name : "");
      setDescription(membershipToEdit ? membershipToEdit.description : "");
      setPrice(membershipToEdit ? membershipToEdit.price : 5);
      setPeriod(membershipToEdit ? membershipToEdit.period : 75);
    }
  }, [dispatch, id, membershipToEdit, success, createdMembership]);

  return (
    <FormContainer fullSize={fullSize}>
      {updateSuccess && (
        <Message variant="info">
          {t("Membership Was Updated Successfully!")}
        </Message>
      )}
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
          {membershipToEdit && (
            <Col md={3}>
              <Form.Group controlId="IsActive" style={{ paddingTop: "2.4rem" }}>
                <Form.Check
                  custom
                  label={t("IsActive")}
                  checked={isActive}
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
              title={t("Price")}
              value={price}
              placeholder={t("Price")}
              onChangeHandler={setPrice}
              required
              type="text"
              key="price"
            />
          </Col>
          <Col>
            <FormItem
              title={t("Active Period")}
              value={period}
              placeholder={t("Active Period In Months")}
              onChangeHandler={setPeriod}
              required
              type="text"
              key="period"
            />
          </Col>
        </Row>
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

export default MembershipForm;
