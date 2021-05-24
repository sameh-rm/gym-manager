import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import EditUserForm from "../../components/forms/users/EditUserForm";
import MainContainer from "../../components/MainContainer/MainContainer";

const EditUserPage = () => {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Edit User")}</h2>
          </Col>

          <Col className="align-content-center">
            <LinkContainer to="/admin/users">
              <Button className="float-left my-4" variant="dark">
                {t("Back")}
              </Button>
            </LinkContainer>
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
