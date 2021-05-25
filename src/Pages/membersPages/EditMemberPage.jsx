import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import MainContainer from "../../components/MainContainer/MainContainer";

import { selectMember } from "../../redux/memberReducers/member.actions";

import { useParams } from "react-router";
import EditMemberForm from "../../components/forms/members/EditMemberForm";
import AsyncComponent from "../../components/Utils/AsyncComponent";
import { useHistory } from "react-router";
const AddMemberPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { member, loading, error } = useSelector(
    (state) => state.member.selectMember
  );
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useSelector((state) => state.member.updateMember);

  useEffect(() => {
    dispatch(selectMember(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (updateSuccess) {
      history.push("/members");
    }
  }, [dispatch, updateSuccess, history]);

  return (
    <MainContainer>
      <Container className="paper_elevation">
        <Row className="paper_elevation mb-4">
          <Col>
            <h2>{t("Add Member")}</h2>
          </Col>

          <Col className="align-content-center">
            <Button
              className="float-left my-4"
              onClick={() => history.goBack()}
              variant="dark"
            >
              {t("Back")}
            </Button>
          </Col>
        </Row>

        <Row
          className="hide-scrollbar"
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <AsyncComponent
            error={error || updateError}
            loading={loading || updateLoading}
          >
            <Container>
              <EditMemberForm member={member} loading={loading} error={error} />
            </Container>
          </AsyncComponent>
        </Row>
      </Container>
    </MainContainer>
  );
};

export default AddMemberPage;
