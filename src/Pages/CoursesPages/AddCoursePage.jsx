import React from "react";
import { Col, Button, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import CourseForm from "../../components/forms/courses/CourseForm";
import MainContainer from "../../components/MainContainer/MainContainer";

const AddCoursePage = ({ history }) => {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row>
          <Col>
            <h2>{t("Add Course")}</h2>
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

export default AddCoursePage;
