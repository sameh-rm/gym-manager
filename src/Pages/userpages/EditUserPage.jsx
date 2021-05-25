import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import EditUserForm from "../../components/forms/users/EditUserForm";
import MainContainer from "../../components/MainContainer/MainContainer";
import { useHistory } from "react-router";
const EditUserPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Edit User")}</h2>
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
          <EditUserForm />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default EditUserPage;
