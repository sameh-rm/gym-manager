import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import MainContainer from "../../components/MainContainer/MainContainer";
import AsyncComponent from "../../components/Utils/AsyncComponent";
import {
  listMemberSubscriptions,
  selectMember,
} from "../../redux/memberReducers/member.actions";
import { memberActionTypes } from "../../redux/memberReducers/member.actionTypes";
import SubsTable from "../../components/CustomTable/SubsTable";
import SubscriptionModal from "../../components/CustomTable/subscriptionModal";
const MemberProfilePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { member, loading, error } = useSelector(
    (state) => state.member.selectMember
  );
  const {
    subscriptionList,
    loading: loadingSubs,
    error: errorSubs,
  } = useSelector((state) => state.member.memberSubsList);

  const [currentMemberShip, setCurrentMemberShip] = useState([]);
  const columns = ["description", "startedAt", "endsAt", "paymentStatus"];
  useEffect(() => {
    dispatch(listMemberSubscriptions(id));
    dispatch(selectMember(id));
    return () => {
      dispatch({ type: memberActionTypes.RESET_SELECT_MEMBER });
    };
  }, [id, dispatch]);

  useEffect(() => {
    const membership = subscriptionList
      ? subscriptionList.find(
          (sub) =>
            sub.type === "Membership" && sub.endsAt > new Date().toISOString()
        )
      : {};
    setCurrentMemberShip(membership);
  }, [subscriptionList]);

  return (
    <MainContainer>
      <Container className="paper_elevation overflow-scroll">
        <Row className="paper_elevation">
          <Col>
            <h2>{t("Member Profile")}</h2>
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
          style={{ maxHeight: "calc(100vh - 250px)", overflow: "scroll" }}
        >
          <hr />
          <AsyncComponent
            loading={loading || loadingSubs}
            error={error || errorSubs}
          >
            {member && (
              <Container>
                <Row className="p-5">
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        {t("Name")}:{" "}
                        <span className="text-black-50">{member.name}</span>
                      </Col>
                    </Row>
                    <Row className="pt-4">
                      <Col md={6}>
                        {t("Membership")}:{" "}
                        <span className="text-black-50">
                          {currentMemberShip
                            ? currentMemberShip.name
                            : t("None")}
                        </span>
                      </Col>
                    </Row>
                    <Row className="pt-5">
                      <Col md={6}>
                        {t("NationalId")}:{" "}
                        <span className="text-black-50">
                          {member.nationalId}
                        </span>
                      </Col>
                      <Col md={6}>
                        {t("Phone")}:{" "}
                        <span className="text-black-50">{member.phone}</span>
                      </Col>
                    </Row>
                    <Row className="pt-5">
                      <Col md={4}>
                        {t("Age")}:{" "}
                        <span className="text-black-50">{member.age}</span>
                      </Col>
                      <Col md={4}>
                        {t("Tall")}:{" "}
                        <span className="text-black-50">{member.tall}</span>
                      </Col>
                      <Col md={4}>
                        {t("Weight")}:{" "}
                        <span className="text-black-50">{member.weight}</span>
                      </Col>
                    </Row>
                    <Row className="pt-5">
                      <Col>
                        {t("Address")}:{" "}
                        <span className="text-black-50">
                          {member.personalAddress.address}
                        </span>
                      </Col>
                      <Col>
                        {t("City")}:{" "}
                        <span className="text-black-50">
                          {member.personalAddress.city}
                        </span>
                      </Col>
                    </Row>
                    <Row className="pt-3">
                      <Col>
                        {t("Center")}:{" "}
                        <span className="text-black-50">
                          {member.personalAddress.center}
                        </span>
                      </Col>
                      <Col>
                        {t("Governorate")}:
                        <span className="text-black-50">
                          {member.personalAddress.governorate}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Image fluid src={member.image} alt={member.name} />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <SubscriptionModal />
                </Row>
                <Row className="py-4">
                  {subscriptionList && (
                    <SubsTable
                      columns={columns}
                      data={subscriptionList}
                      loading={loading}
                      error={error}
                      editEndpoint="subscriptions"
                      moreRows={3}
                    />
                  )}
                </Row>
              </Container>
            )}
          </AsyncComponent>
        </Row>
      </Container>
    </MainContainer>
  );
};

export default MemberProfilePage;
