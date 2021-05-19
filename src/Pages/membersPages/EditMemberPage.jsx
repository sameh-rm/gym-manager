import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import MainContainer from "../../components/MainContainer/MainContainer";
import { loadImageUrl } from "../../utils/utils";
import {
  selectMember,
  updateMember,
} from "../../redux/memberReducers/member.actions";
import { memberActionTypes } from "../../redux/memberReducers/member.actionTypes";
import { useParams } from "react-router";
import EditMemberForm from "../../components/forms/members/EditMemberForm";
import AsyncComponent from "../../components/Utils/AsyncComponent";

const AddMemberPage = ({ history }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { member, loading, error, success } = useSelector(
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
      dispatch({ type: memberActionTypes.RESET_SELECT_MEMBER });

      dispatch({ type: memberActionTypes.RESET_EDIT_MEMBER });
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
            <LinkContainer to="/members">
              <Button className="float-left my-4" variant="dark">
                {t("Back")}
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        <Row
          className="hide-scrollbar"
          style={{ height: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <AsyncComponent
            error={error || updateError}
            loading={loading || updateLoading}
          >
            <Container>
              <EditMemberForm />
            </Container>
          </AsyncComponent>
        </Row>
      </Container>
    </MainContainer>
  );
};

export default AddMemberPage;
