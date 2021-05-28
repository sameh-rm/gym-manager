import moment from "moment-timezone";

import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { listMemberSubscriptions } from "../../../redux/memberReducers/member.actions";
import {
  addSubscription,
  listDailySubsInDateRange,
} from "../../../redux/subscriptionsReducers/subscriptions.actions";
import { addDate } from "../../../utils/utils";
import DailySubscriptionForm from "./DailySubscriptionForm";

const DailySubscriptionModal = ({ className, member }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const [subscription, setsubscription] = useState({});

  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      subscription.dailyMember &&
      (subscription.dailyMember !== [] || subscription.dailyMember !== "")
    ) {
      const endsAt = addDate(subscription.period, "day");
      dispatch(
        addSubscription({
          // member: member,
          dailyMember: subscription.dailyMember,
          type: subscription.type,
          courses: subscription.courses,
          name: subscription.name,
          description: subscription.description,
          period: subscription.period || 1,
          price: subscription.price,
          paid: subscription.paid,
          endsAt: endsAt,
        })
      );
      handleClose();
      dispatch(listDailySubsInDateRange());
    }
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <div className={`${className && className}`}>
      <Button variant="success" onClick={handleShow} title={t("Pay")}>
        {t("Add DailySub")}
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>{t("DailySub")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-right">
          <DailySubscriptionForm
            subscription={subscription}
            setsubscription={setsubscription}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("Close")}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {t("Subscribe")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DailySubscriptionModal;
