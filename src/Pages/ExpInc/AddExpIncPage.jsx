import React from "react";
import { Col, Button, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import CourseForm from "../../components/forms/courses/CourseForm";
import MainContainer from "../../components/MainContainer/MainContainer";

const AddExpIncPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Add Course")}</h2>
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

export default AddExpIncPage;
