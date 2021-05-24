import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import AddUserForm from "../../components/forms/users/AddUserForm";
import MainContainer from "../../components/MainContainer/MainContainer";

const AddUserPage = () => {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Add User")}</h2>
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
          <AddUserForm />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default AddUserPage;
