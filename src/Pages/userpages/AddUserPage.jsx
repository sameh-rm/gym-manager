import React, { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import UserForm from "../../components/adminCompnents/Forms/UserForm";
import MainContainer from "../../components/MainContainer/MainContainer";
import { selectItemByUrl } from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";

const AddUserPage = ({ history, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectItemByUrl(location.pathname));
    // dispatch({ type: "RESET" });
  }, [dispatch, location]);

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Col>
          <Row>
            <Col>
              <h2>{t("Add User")}</h2>
            </Col>

            <Col className="align-content-center">
              <Button
                className="float-left btn-dark my-4 py-2 px-4 "
                variant="light"
                onClick={() => {
                  history.goBack();
                }}
              >
                {t("Back")}
              </Button>
            </Col>
          </Row>
          <hr />
        </Col>
        <Row>
          <UserForm history={history} />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default AddUserPage;
