import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectItemByUrl } from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import MainContainer from "../../components/MainContainer/MainContainer";
import { LinkContainer } from "react-router-bootstrap";
import {
  deleteCourse,
  listAllCourses,
} from "../../redux/courseReducers/course.actions";
import CustomTable from "../../components/CustomTable/CustomTable";
import Message from "../../components/Message";
const CoursePage = ({ history, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [deletedSuccess, setDeletedSuccess] = useState();
  useEffect(() => {
    dispatch(selectItemByUrl(location.pathname));
  }, [dispatch, location]);
  const { coursesList, loading, error } = useSelector(
    (state) => state.course.coursesList
  );
  const courseCreatedSuccess = useSelector(
    (state) => state.course.addCourse.success
  );
  const courseEditedSuccess = useSelector(
    (state) => state.course.updateCourse.success
  );
  const deleteHandler = (id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteCourse(id));
      setDeletedSuccess(t("Course Was Deleted Successfully!"));
    }
  };

  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [editedSuccess, setEditedSuccess] = useState(false);
  useEffect(() => {
    dispatch(listAllCourses());
    if (courseCreatedSuccess || courseEditedSuccess) {
      dispatch({ type: "RESET_COURSE_FORM" });
      dispatch({ type: "RESET_ADD_COURSE_FORM" });
      setCreatedSuccess(courseCreatedSuccess);
      setEditedSuccess(courseEditedSuccess);
    }
  }, [dispatch, deletedSuccess, courseCreatedSuccess, courseEditedSuccess]);
  const columns = [
    "description",
    "dailyPrice",
    "monthlyPrice",
    "daysPerMonth",
    "minutesPerTime",
  ];

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Courses List")}</h2>
          </Col>

          <Col className="align-content-center">
            <LinkContainer to="/courses/add">
              <Button className="float-left my-4" variant="dark">
                {t("Add Course")}
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        {createdSuccess ? (
          <Message variant="success">
            {t("Course Was Created Successfully!")}
          </Message>
        ) : (
          editedSuccess && (
            <Message variant="success">
              {t("Course Was Updated Successfully!")}
            </Message>
          )
        )}
        {deletedSuccess && (
          <Message variant="info">{t("Item Was Deleted Successfully")}</Message>
        )}
        <Row
          className="hide-scrollbar"
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <CustomTable
            columns={columns}
            data={coursesList}
            deleteHandler={deleteHandler}
            loading={loading}
            error={error}
            editEndpoint="courses"
            detailEndpoint="courses"
            listData={listAllCourses}
          />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default CoursePage;
