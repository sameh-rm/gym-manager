import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import AddUserForm from "../../components/forms/users/AddUserForm";
import MainContainer from "../../components/MainContainer/MainContainer";
import { useHistory } from "react-router";
const AddUserPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Add User")}</h2>
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
        <Row>
          <AddUserForm />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default AddUserPage;
