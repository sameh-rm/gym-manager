import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Select from "react-select";
import { listAllCourses } from "../../redux/courseReducers/course.actions";
import { optionsToCourses } from "../../redux/courseReducers/utils";
import {
  listMemberSubscriptions,
  selectMember,
} from "../../redux/memberReducers/member.actions";
import { listAllMemberShips } from "../../redux/memberShipReducers/membership.actions";
import { addSubscription } from "../../redux/subscriptionsReducers/subscriptions.actions";
import SubscriptionForm from "../forms/SubscriptionForm";

const SubscriptionModal = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const {
    membershipsAsOptions,
    loading: membershipLoading,
    error: membershipError,
  } = useSelector((state) => state.membership.membershipsList);

  const {
    coursesAsOptions,
    loading: courseLoading,
    error: courseError,
  } = useSelector((state) => state.course.coursesList);
  const { member } = useSelector((state) => state.member.selectMember);
  const [coursesValues, setCoursesValues] = useState([]);
  const [membershipValue, setMembershipValues] = useState([]);
  const options = useMemo(
    () => [
      { label: t("Membership"), value: "Membership" },
      { label: t("Course"), value: "Course" },
    ],
    [t]
  );
  const [value, setValue] = useState(0);

  const [type, setType] = useState(options[0]);
  const [option, setOption] = useState();
  const handleSubmit = (e) => {
    if (type.value && coursesValues && membershipValue && value) {
      const startDate = moment();
      const endDate = moment(startDate).add(membershipValue.period, "month");
      dispatch(
        addSubscription({
          member: member,
          type: type.value,
          courses: optionsToCourses(coursesValues),
          name: membershipValue.name,
          description: membershipValue.description,
          period: membershipValue.period,
          price: membershipValue.price,
          paid: value,
          endsAt: endDate,
        })
      );
      dispatch(listMemberSubscriptions(member._id));
      handleClose();
    } else {
    }
  };
  useEffect(() => {
    setMembershipValues([]);
    setType(options[0]);
    setOption({});
    setCoursesValues([]);
  }, [show]);

  useEffect(() => {
    dispatch(listAllCourses());
    dispatch(listAllMemberShips());

    return () => {};
  }, [dispatch]);

  return (
    <>
      <Button variant="primary" onClick={handleShow} title={t("Pay")}>
        <i className="fal fa-money-bill-alt"></i>
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>{t("Add Subscription")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-right">
          <SubscriptionForm
            membershipsAsOptions={membershipsAsOptions}
            membershipLoading={membershipLoading}
            membershipError={membershipError}
            coursesAsOptions={coursesAsOptions}
            courseLoading={courseLoading}
            courseError={courseError}
            coursesValues={coursesValues}
            setCoursesValues={setCoursesValues}
            membershipValue={membershipValue}
            setMembershipValues={setMembershipValues}
            options={options}
            type={type}
            setType={setType}
            option={option}
            setOption={setOption}
            handleSubmit={handleSubmit}
            value={value}
            setValue={setValue}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            {t("subscribe")}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t("Close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubscriptionModal;
