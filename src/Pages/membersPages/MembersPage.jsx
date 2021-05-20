import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectItemByUrl } from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import MainContainer from "../../components/MainContainer/MainContainer";
import { LinkContainer } from "react-router-bootstrap";
import {
  deleteMember,
  listAllMembers,
} from "../../redux/memberReducers/member.actions";
import CustomTable from "../../components/CustomTable/CustomTable";
import Message from "../../components/Message";
import { memberActionTypes } from "../../redux/memberReducers/member.actionTypes";
import AsyncComponent from "../../components/Utils/AsyncComponent";

const MembersPage = ({ history, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectItemByUrl(location.pathname));
  }, [dispatch, location]);
  const { membersList, loading, error } = useSelector(
    (state) => state.member.membersList
  );
  const memberCreatedSuccess = useSelector(
    (state) => state.member.addMember.success
  );
  const memberUpdateSuccess = useSelector(
    (state) => state.member.updateMember.success
  );
  const memberDeletedSuccess = useSelector(
    (state) => state.member.deleteMember.success
  );
  const [deletedSuccess, setDeletedSuccess] = useState();
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [editedSuccess, setEditedSuccess] = useState(false);
  const deleteHandler = (id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteMember(id));
      setDeletedSuccess(t("Member Was Deleted Successfully!"));
    }
  };
  useEffect(() => {
    dispatch(listAllMembers());
  }, [dispatch]);

  useEffect(() => {
    if (memberCreatedSuccess || memberUpdateSuccess || deletedSuccess) {
      setCreatedSuccess(memberCreatedSuccess);
      setEditedSuccess(memberUpdateSuccess);
      setDeletedSuccess(memberDeletedSuccess);
      dispatch(listAllMembers());
      dispatch({ type: memberActionTypes.RESET_ADD_MEMBER });
      dispatch({ type: memberActionTypes.RESET_SELECT_MEMBER });
      dispatch({ type: memberActionTypes.RESET_EDIT_MEMBER });
    }
  }, [
    dispatch,
    memberCreatedSuccess,
    memberDeletedSuccess,
    memberUpdateSuccess,
    deletedSuccess,
  ]);

  const columns = ["image", "nationalId", "age", "tall"];

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Members List")}</h2>
          </Col>

          <Col className="align-content-center">
            <LinkContainer to="/members/add">
              <Button className="float-left my-4" variant="dark">
                {t("Add Member")}
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        {createdSuccess ? (
          <Message variant="success">
            {t("Member Was Created Successfully!")}
          </Message>
        ) : (
          editedSuccess && (
            <Message variant="info">
              {t("Member Was Updated Successfully!")}
            </Message>
          )
        )}
        {deletedSuccess && (
          <Message variant="danger">
            {t("Item Was Deleted Successfully")}
          </Message>
        )}
        <Row
          className="hide-scrollbar"
          style={{ height: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <AsyncComponent loading={loading} error={error}>
            <CustomTable
              columns={columns}
              data={membersList}
              deleteHandler={deleteHandler}
              loading={loading}
              error={error}
              editEndpoint="members"
              listData={listAllMembers}
              moreRows={3}
            />
          </AsyncComponent>
        </Row>
      </Container>
    </MainContainer>
  );
};

export default MembersPage;
