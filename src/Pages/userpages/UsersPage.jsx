import React, { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import UsersTable from "../../components/adminCompnents/UsersTable/UsersTable";
import { listAllUsers } from "../../redux/coreReducers/adminReducers/admin.actions";
import { selectItemByUrl } from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import MainContainer from "../../components/MainContainer/MainContainer";
const UsersPage = ({ history, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(location);
    dispatch(selectItemByUrl(location.pathname));
    dispatch(listAllUsers());
  }, [dispatch, location]);

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row>
          <Col>
            <h2>{t("Users List")}</h2>
          </Col>
          <Col className="align-content-center">
            <Button className="float-left my-4" variant="dark">
              {t("Add User")}
            </Button>
          </Col>
        </Row>
        <Row>
          <UsersTable history={history} />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default UsersPage;
