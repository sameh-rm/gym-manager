import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FormCoursesMenu from "../../components/forms/courses/FormCoursesMenu";
import AddMemberForm from "../../components/forms/members/AddMemberForm";
import MainContainer from "../../components/MainContainer/MainContainer";
import MultiStepForm from "../../components/MultiStepForm/MultiStepForm";
import { loadImageUrl } from "../../utils/utils";
import { coursesToOptions } from "../../redux/courseReducers/utils";
import { listAllCourses } from "../../redux/courseReducers/course.actions";
import { listAllMemberShips } from "../../redux/memberShipReducers/membership.actions";
import { addMember } from "../../redux/memberReducers/member.actions";
import { memberActionTypes } from "../../redux/memberReducers/member.actionTypes";
import ReviewScreen from "../../components/screens/ReviewScreen";
import { useHistory } from "react-router";
const AddMemberPage = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { error, loading, success } = useSelector(
    (state) => state.member.addMember
  );
  const {
    membershipsAsOptions,
    loading: membershipLoading,
    success: membershipSuccess,
    error: membershipError,
  } = useSelector((state) => state.membership.membershipsList);
  const {
    coursesList,
    loading: courseLoading,
    error: courseError,
  } = useSelector((state) => state.course.coursesList);

  const [coursesValues, setCoursesValues] = useState([]);
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [tall, setTall] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("ش 10");
  const [city, setCity] = useState("المنشية");
  const [center, setCenter] = useState("الخانكة");
  const [governorate, setGovernorate] = useState("القليوبية");
  const [image, setImage] = useState(
    loadImageUrl("/uploads/person-sample.jpg")
  );
  const [membershipValue, setMembershipValues] = useState(false);
  const [uploading, setUploading] = useState(false);

  const saveMembership = () => {
    dispatch(
      addMember({
        name,
        age,
        nationalId,
        phone,
        tall,
        weight,
        personalAddress: { address, city, center, governorate },
        image,
        coursesValues,
        membershipValue,
        payment,
      })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    saveMembership();
  };
  useEffect(() => {
    dispatch(listAllCourses());
    dispatch(listAllMemberShips());
    dispatch({ type: memberActionTypes.RESET_ADD_MEMBER });

    return () => {};
  }, [dispatch]);

  useEffect(() => {
    // on Create or Update Success
    if (success) {
      history.push("/members");
    }
  }, [dispatch, success, history]);

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Add Member")}</h2>
          </Col>

          <Col className="align-content-center">
            <Button
              className="float-left my-4"
              onClick={() => history.goBack()}
              variant="primary"
            >
              {t("Back")}
            </Button>
          </Col>
        </Row>

        <Row
          className="hide-scrollbar"
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <Container>
            <MultiStepForm
              error={error}
              loading={loading}
              courseLoading={courseLoading}
              courseError={courseError}
              membershipError={membershipError}
              membershipLoading={membershipLoading}
              submitHandler={submitHandler}
              fullSize
              forms={{
                Membership: (
                  <AddMemberForm
                    history={history}
                    // Async Component props

                    membershipLoading={membershipLoading}
                    membershipSuccess={membershipSuccess}
                    // state props
                    name={name}
                    setName={setName}
                    image={image}
                    setImage={setImage}
                    age={age}
                    setAge={setAge}
                    nationalId={nationalId}
                    setNationalId={setNationalId}
                    phone={phone}
                    setPhone={setPhone}
                    tall={tall}
                    setTall={setTall}
                    weight={weight}
                    setWeight={setWeight}
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                    center={center}
                    setCenter={setCenter}
                    governorate={governorate}
                    setGovernorate={setGovernorate}
                    uploading={uploading}
                    setUploading={setUploading}
                  />
                ),
                Courses: (
                  <FormCoursesMenu
                    membership
                    membershipPart
                    selectable
                    title={t("Select Courses")}
                    coursesAsOptions={coursesToOptions(coursesList)}
                    setCoursesValues={setCoursesValues}
                    coursesValues={coursesValues}
                    membershipValue={membershipValue}
                    setMembershipValues={setMembershipValues}
                    membershipsAsOptions={membershipsAsOptions}
                  />
                ),
                Review: (
                  <ReviewScreen
                    coursesValues={coursesValues}
                    membershipValue={membershipValue}
                    name={name}
                    image={image}
                    age={age}
                    nationalId={nationalId}
                    phone={phone}
                    tall={tall}
                    weight={weight}
                    address={address}
                    city={city}
                    center={center}
                    governorate={governorate}
                    uploading={uploading}
                    total={total}
                    setTotal={setTotal}
                    payment={payment}
                    setPayment={setPayment}
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

export default AddMemberPage;
