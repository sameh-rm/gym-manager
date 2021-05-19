import React, { useEffect } from "react";
import { Col, Button, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import CourseForm from "../../components/forms/courses/CourseForm";
import MainContainer from "../../components/MainContainer/MainContainer";
import { selectCourse } from "../../redux/courseReducers/course.actions";
import { courseActionTypes } from "../../redux/courseReducers/course.actionTypes";

const EditCoursePage = ({ history }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectCourse(id));
    return () => {
      dispatch({
        type: courseActionTypes.RESET_SELECT_COURSE,
      });
    };
  }, [dispatch, id]);

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row>
          <Col>
            <h2>{t("Edit Course")}</h2>
          </Col>

          <Col className="align-content-center">
            <LinkContainer to="/courses">
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
          <CourseForm history={history} />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default EditCoursePage;
