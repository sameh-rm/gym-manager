import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectItemByUrl } from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import MainContainer from "../../components/MainContainer/MainContainer";
import { LinkContainer } from "react-router-bootstrap";
import ExpIncTable from "../../components/CustomTable/ExpIncTable";
import Message from "../../components/Message";
import {
  deleteExpInc,
  listAllExpIncs,
} from "../../redux/expincReducers/expinc.actions";
const CoursePage = ({ history, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [deletedSuccess, setDeletedSuccess] = useState();
  useEffect(() => {
    dispatch(selectItemByUrl(location.pathname));
  }, [dispatch, location]);
  const { expincsList, loading, error } = useSelector(
    (state) => state.expinc.expincsList
  );
  const courseCreatedSuccess = useSelector(
    (state) => state.course.addCourse.success
  );
  const courseEditedSuccess = useSelector(
    (state) => state.course.updateCourse.success
  );
  const deleteHandler = (id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteExpInc(id));
      setDeletedSuccess(t("Course Was Deleted Successfully!"));
    }
  };

  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [editedSuccess, setEditedSuccess] = useState(false);
  useEffect(() => {
    dispatch(listAllExpIncs());
    if (courseCreatedSuccess || courseEditedSuccess) {
      dispatch({ type: "RESET_EXPINC_FORM" });
      dispatch({ type: "RESET_ADD_EXPINC_FORM" });
      setCreatedSuccess(courseCreatedSuccess);
      setEditedSuccess(courseEditedSuccess);
    }
  }, [dispatch, deletedSuccess, courseCreatedSuccess, courseEditedSuccess]);
  const columns = [
    // "description",
    "value",
    "createdAt",
    "updatedAt",
    "confirmed",
  ];

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Courses List")}</h2>
          </Col>

          <Col className="align-content-center">
            <LinkContainer to="/courses/add">
              <Button className="float-left my-4" variant="primary">
                {t("Add Course")}
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        {createdSuccess ? (
          <Message variant="success">
            {t("Course Was Created Successfully!")}
          </Message>
        ) : (
          editedSuccess && (
            <Message variant="success">
              {t("Course Was Updated Successfully!")}
            </Message>
          )
        )}
        {deletedSuccess && (
          <Message variant="info">{t("Item Was Deleted Successfully")}</Message>
        )}
        <Row
          className="hide-scrollbar"
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <ExpIncTable
            columns={columns}
            data={expincsList}
            deleteHandler={deleteHandler}
            loading={loading}
            error={error}
            editEndpoint="expenses"
            detailEndpoint="expenses"
          />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default CoursePage;
