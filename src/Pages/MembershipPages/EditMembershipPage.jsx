import React, { useEffect, useState } from "react";
import { Col, Button, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import FormCoursesMenu from "../../components/forms/courses/FormCoursesMenu";
import MembershipForm from "../../components/forms/membership/MembershipForm";
import MainContainer from "../../components/MainContainer/MainContainer";
import MultiStepForm from "../../components/MultiStepForm/MultiStepForm";
import { listAllCourses } from "../../redux/courseReducers/course.actions";
import { coursesToOptions } from "../../redux/courseReducers/utils";
import {
  addMembership,
  updateMemberShip,
} from "../../redux/memberShipReducers/membership.actions";
import { membershipActionTypes } from "../../redux/memberShipReducers/membership.actionTypes";
// Adding a membership comes in two steps
// step 1: creating a membership
// step 2: update its list of courses
const AddMembershipPage = ({ history }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { membership: membershipToEdit } = useSelector(
    (state) => state.membership.selectMembership
  );
  const { error, loading, success } = useSelector(
    (state) => state.membership.addMembership
  );
  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = useSelector((state) => state.membership.updateMembership);
  const {
    coursesList,
    loading: courseLoading,
    error: courseError,
  } = useSelector((state) => state.course.coursesList);
  const dispatch = useDispatch();

  const [coursesValues, setCoursesValues] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [period, setPeriod] = useState(1);
  const [isActive, setIsActive] = useState(
    membershipToEdit ? membershipToEdit.isActive : false
  );

  const saveMembership = () => {
    console.log(name, description, price, period, coursesValues);

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
        coursesValues,
        isActive,
      })
    );
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!membershipToEdit) saveMembership();
    else editMembership();
  };

  useEffect(() => {
    dispatch(listAllCourses());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    // on Create or Update Success
    if (success || updateSuccess) {
      history.push("/memberships");
    }
    return () => {
      dispatch({ type: membershipActionTypes.RESET_SELECT_MEMBERSHIP });
    };
  }, [dispatch, success, updateSuccess, history]);

  useEffect(() => {
    // on Create or Update Success
    setName(membershipToEdit ? membershipToEdit.name : "");
    setDescription(membershipToEdit ? membershipToEdit.description : "");
    setPrice(membershipToEdit ? membershipToEdit.price : 120);
    setPeriod(membershipToEdit ? membershipToEdit.period : 2);
  }, [dispatch, id, membershipToEdit]);

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row>
          <Col>
            <h2>{t(`${id ? "Edit" : "Add"} Membership`)}</h2>
          </Col>

          <Col className="align-content-center">
            <LinkContainer to="/memberships">
              <Button className="float-left my-4" variant="dark">
                {t("Back")}
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        <Row
          className="hide-scrollbar"
          style={{ height: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <Container>
            <MultiStepForm
              submitHandler={submitHandler}
              fullSize
              forms={{
                Membership: (
                  <MembershipForm
                    history={history}
                    // Async Component props
                    error={error}
                    loading={loading}
                    updateError={updateError}
                    updateLoading={updateLoading}
                    courseLoading={courseLoading}
                    courseError={courseError}
                    // state props
                    setName={setName}
                    setDescription={setDescription}
                    setPrice={setPrice}
                    setPeriod={setPeriod}
                    setIsActive={setIsActive}
                    name={name}
                    description={description}
                    price={price}
                    period={period}
                    isActive={isActive}
                  />
                ),
                Courses: (
                  <FormCoursesMenu
                    selectable
                    editable
                    title={t("Select Courses")}
                    coursesAsOptions={coursesToOptions(coursesList)}
                    setCoursesValues={setCoursesValues}
                    coursesValues={coursesValues}
                  >
                    Courses
                  </FormCoursesMenu>
                ),
              }}
            />
          </Container>
        </Row>
      </Container>
    </MainContainer>
  );
};

export default AddMembershipPage;
