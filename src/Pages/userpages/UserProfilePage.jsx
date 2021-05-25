import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import MainContainer from "../../components/MainContainer/MainContainer";
import AsyncComponent from "../../components/Utils/AsyncComponent";
import { adminActionTypes } from "../../redux/coreReducers/adminReducers/admin.actionTypes";
import { deleteSubscription } from "../../redux/subscriptionsReducers/subscriptions.actions";
import { selectUser } from "../../redux/coreReducers/adminReducers/admin.actions";
const UserProfilePage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(
    (state) => state.core.selectUser
  );

  const columns = ["description", "startedAt", "endsAt", "paymentStatus"];
  const deleteHandler = (row_id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteSubscription(row_id));
      // setDeleteSuccess(true);
    }
  };
  useEffect(() => {
    dispatch(selectUser(id));

    return () => {
      dispatch({ type: adminActionTypes.RESET_SELECT_USER });
    };
  }, [id, dispatch]);

  return (
    <MainContainer>
      <Container className="paper_elevation overflow-scroll">
        <Row
          className="paper_elevation"
          style={{
            background: "#87b9f7",
            color: "#fff",
          }}
        >
          <Col>
            <h2>{t("User Profile")}</h2>
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
        <Row
          className="hide-scrollbar"
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <hr />
          <AsyncComponent loading={loading} error={error}>
            {user && (
              <Container>
                <Row className="p-5">
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        {t("Name")}:{" "}
                        <span className="text-success">{user.name}</span>
                      </Col>
                      <Col md={6}>
                        {t("IsAdmin")}:{" "}
                        {user.isAdmin ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "#22DD86" }}
                          ></i>
                        ) : (
                          <i
                            className="fa fa-times"
                            style={{ color: "#fc9f9f" }}
                          ></i>
                        )}
                      </Col>
                    </Row>
                    <Row className="pt-5">
                      <Col md={6}>
                        {t("Username")}:{" "}
                        <span className="text-success">{user.username}</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Image fluid src={user.image} alt={user.name} />
                    </Row>
                  </Col>
                </Row>
                <h1>Activties</h1>
                <p>
                  (Insert, Update, Delete process's that was made by this user)
                </p>
              </Container>
            )}
          </AsyncComponent>
        </Row>
      </Container>
    </MainContainer>
  );
};

export default UserProfilePage;
