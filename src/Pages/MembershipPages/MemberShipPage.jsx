import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectItemByUrl } from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";
import MainContainer from "../../components/MainContainer/MainContainer";
import { LinkContainer } from "react-router-bootstrap";
import {
  deleteMemberShip,
  listAllMemberShips,
} from "../../redux/memberShipReducers/membership.actions";
import CustomTable from "../../components/CustomTable/CustomTable";
import Message from "../../components/Message";
const MemberShipPage = ({ history, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [deletedSuccess, setDeletedSuccess] = useState();
  useEffect(() => {
    dispatch(selectItemByUrl(location.pathname));
  }, [dispatch, location]);
  const { membershipsList, loading, error } = useSelector(
    (state) => state.membership.membershipsList
  );
  const memberShipCreatedSuccess = useSelector(
    (state) => state.membership.addMembership.success
  );
  const memberShipUpdateSuccess = useSelector(
    (state) => state.membership.updateMembership.success
  );
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [editedSuccess, setEditedSuccess] = useState(false);
  const deleteHandler = (id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteMemberShip(id));
      setDeletedSuccess(t("MemberShip Was Deleted Successfully!"));
    }
  };

  useEffect(() => {
    dispatch(listAllMemberShips());
    if (memberShipCreatedSuccess || memberShipUpdateSuccess) {
      dispatch({ type: "RESET_MEMBERSHIP_FORM" });
      dispatch({ type: "RESET_ADD_MEMBERSHIP_FORM" });
      setCreatedSuccess(memberShipCreatedSuccess);
      setEditedSuccess(memberShipUpdateSuccess);
    }
  }, [
    dispatch,
    memberShipCreatedSuccess,
    memberShipUpdateSuccess,
    deletedSuccess,
  ]);
  const columns = ["name", "description", "period", "price"];

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("MemberShips List")}</h2>
          </Col>

          <Col className="align-content-center">
            <LinkContainer to="/memberships/add">
              <Button className="float-left my-4" variant="dark">
                {t("Add MemberShip")}
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        {createdSuccess ? (
          <Message variant="success">
            {t("MemberShip Was Created Successfully!")}
          </Message>
        ) : (
          editedSuccess && (
            <Message variant="info">
              {t("MemberShip Was Updated Successfully!")}
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
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <CustomTable
            columns={columns}
            data={membershipsList}
            deleteHandler={deleteHandler}
            loading={loading}
            error={error}
            editEndpoint="memberships"
            detailEndpoitn="memberships"
            listData={listAllMemberShips}
            moreRows={3}
          />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default MemberShipPage;
