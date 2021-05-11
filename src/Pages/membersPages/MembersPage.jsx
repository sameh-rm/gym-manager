import React, { useEffect } from "react";
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
const MembersPage = ({ history, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectItemByUrl(location.pathname));
  }, [dispatch, location]);
  const { membersList, loading, error } = useSelector(
    (state) => state.member.membersList
  );
  const deleteHandler = (id) => {
    if (window.confirm(t("Are you sure?"))) {
      dispatch(deleteMember(id));
    }
  };
  useEffect(() => {
    dispatch(listAllMembers());
    return () => {
      console.log("useEffect Returned");
    };
  }, [dispatch]);
  const columns = ["image", "name", "age", "tall", "nationalId"];

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row>
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
        <Row
          className="hide-scrollbar"
          style={{ height: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <CustomTable
            columns={columns}
            data={membersList}
            deleteHandler={deleteHandler}
            loading={loading}
            error={error}
            editEndpoint="members"
          />
        </Row>
      </Container>
    </MainContainer>
  );
};

export default MembersPage;
