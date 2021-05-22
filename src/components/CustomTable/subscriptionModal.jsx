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
import Message from "../Message";

const SubscriptionModal = ({ className }) => {
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
  const [validationError, setvalidationError] = useState();
  const handleSubmit = (e) => {
    if (type.value && coursesValues && membershipValue && value) {
      const startDate = moment();
      const endDate = moment(startDate).add(membershipValue.period, "month");
      console.log(membershipValue);
      dispatch(
        addSubscription({
          member: member,
          type: type.value,
          courses: optionsToCourses(
            Array.isArray(coursesValues) ? coursesValues : [coursesValues]
          ),
          name: membershipValue.name,
          description: membershipValue.description,
          period: coursesValues[0] ? coursesValues[0].value.period : 1,
          price: membershipValue.monthlyPrice
            ? membershipValue.monthlyPrice * (membershipValue.period || 1)
            : membershipValue.price,
          paid: value,
          endsAt: endDate,
        })
      );
      dispatch(listMemberSubscriptions(member._id));
      handleClose();
      setvalidationError();
    } else {
      setvalidationError(t("Please fill all fields!"));
    }
  };
  useEffect(() => {
    setMembershipValues([]);
    setType(options[0]);
    setOption({});
    setCoursesValues([]);
    setValue(0);
  }, [show]);

  useEffect(() => {
    dispatch(listAllCourses());
    dispatch(listAllMemberShips());

    return () => {};
  }, [dispatch]);

  return (
    <div className={`${className}`}>
      <Button variant="primary" onClick={handleShow} title={t("Pay")}>
        {t("Add Subscription")}
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>{t("Add Subscription")}</Modal.Title>
          {validationError && <Message>{validationError}</Message>}
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
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            {t("Subscribe")}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t("Close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubscriptionModal;
