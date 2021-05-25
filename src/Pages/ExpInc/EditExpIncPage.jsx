import React, { useEffect } from "react";
import { Col, Button, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import MainContainer from "../../components/MainContainer/MainContainer";
// import { selectExpInc } from "../../redux/courseReducers/course.actions";
import { courseActionTypes } from "../../redux/courseReducers/course.actionTypes";
import CourseForm from "../../components/forms/courses/CourseForm";
import { useHistory } from "react-router";
const EditExpIncPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(selectExpInc(id));
    return () => {
      dispatch({
        type: courseActionTypes.RESET_SELECT_COURSE,
      });
    };
  }, [dispatch, id]);

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Edit ExpInc")}</h2>
          </Col>

          <Col className="align-content-center">
            <Button
              className="float-left my-4"
              onClick={() => history.goBack()}
              variant="dark"
            >
              {t("Back")}
            </Button>
          </Col>
        </Row>

        <Row
          className="hide-scrollbar"
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <CourseForm history={history} />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default EditExpIncPage;
