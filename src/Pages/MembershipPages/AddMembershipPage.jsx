import React, { useEffect, useState } from "react";
import { Col, Button, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import MembershipCourses from "../../components/forms/courses/MembershipCourses";
import MembershipForm from "../../components/forms/membership/MembershipForm";
import MainContainer from "../../components/MainContainer/MainContainer";
import MultiStepForm from "../../components/MultiStepForm/MultiStepForm";
import { listAllCourses } from "../../redux/courseReducers/course.actions";
import { coursesToOptions } from "../../redux/courseReducers/utils";
import { addMembership } from "../../redux/memberShipReducers/membership.actions";
import { membershipActionTypes } from "../../redux/memberShipReducers/membership.actionTypes";
// Adding a membership comes in two steps
// step 1: creating a membership
// step 2: update its list of courses
const AddMembershipPage = ({ history }) => {
  const { t } = useTranslation();

  const { error, loading, success } = useSelector(
    (state) => state.membership.addMembership
  );
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

  const submitHandler = (e) => {
    e.preventDefault();
    saveMembership();
  };

  useEffect(() => {
    dispatch(listAllCourses());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    // on Create or Update Success
    if (success) {
      history.push("/memberships");
    }
    return () => {
      dispatch({ type: membershipActionTypes.RESET_SELECT_MEMBERSHIP });
    };
  }, [dispatch, success, history]);

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("AddMembership")}</h2>
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
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
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
                    courseLoading={courseLoading}
                    courseError={courseError}
                    // state props
                    setName={setName}
                    setDescription={setDescription}
                    setPrice={setPrice}
                    setPeriod={setPeriod}
                    name={name}
                    description={description}
                    price={price}
                    period={period}
                  />
                ),
                Courses: (
                  <MembershipCourses
                    selectable
                    title={t("Select Courses")}
                    coursesAsOptions={coursesToOptions(coursesList)}
                    setCoursesValues={setCoursesValues}
                    coursesValues={coursesValues}
                  />
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
