import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  listAllUsers,
} from "../../redux/coreReducers/adminReducers/admin.actions";
import { selectItemByUrl } from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import MainContainer from "../../components/MainContainer/MainContainer";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import CustomTable from "../../components/CustomTable/CustomTable";
const UsersPage = ({ history, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [deletedSuccess, setDeletedSuccess] = useState();
  useEffect(() => {
    dispatch(selectItemByUrl(location.pathname));
  }, [dispatch, location]);
  const { usersList, loading, error } = useSelector(
    (state) => state.core.usersList
  );
  const userCreatedSuccess = useSelector((state) => state.core.addUser.success);
  const userUpdateSuccess = useSelector(
    (state) => state.core.updateUser.success
  );
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [editedSuccess, setEditedSuccess] = useState(false);
  const deleteHandler = (id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteUser(id));
      setDeletedSuccess(t("User Was Deleted Successfully!"));
    }
  };

  useEffect(() => {
    dispatch(listAllUsers());
    if (userCreatedSuccess || userUpdateSuccess) {
      setCreatedSuccess(userCreatedSuccess);
      setEditedSuccess(userUpdateSuccess);
    }
  }, [dispatch, userCreatedSuccess, userUpdateSuccess, deletedSuccess]);
  const columns = ["image", "name", "username", "isAdmin"];

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("User List")}</h2>
          </Col>

          <Col className="align-content-center">
            <LinkContainer to="/admin/users/add">
              <Button className="float-left my-4" variant="dark">
                {t("Add User")}
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        {createdSuccess ? (
          <Message variant="success">
            {t("User Was Created Successfully!")}
          </Message>
        ) : (
          editedSuccess && (
            <Message variant="info">
              {t("User Was Updated Successfully!")}
            </Message>
          )
        )}
        {deletedSuccess && (
          <Message variant="danger">
            {t("User Was Deleted Successfully")}
          </Message>
        )}
        <Row
          className="hide-scrollbar"
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <CustomTable
            columns={columns}
            data={usersList}
            deleteHandler={deleteHandler}
            loading={loading}
            error={error}
            editEndpoint="admin/users"
            listData={listAllUsers}
            moreRows={3}
          />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default UsersPage;
