import moment from "moment";

import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { listMemberSubscriptions } from "../../../redux/memberReducers/member.actions";
import { addSubscription } from "../../../redux/subscriptionsReducers/subscriptions.actions";
import SubscriptionForm from "./SubscriptionForm";

const SubscriptionModal = ({ className, member }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const [subscription, setsubscription] = useState({});

  const { t } = useTranslation();
  const handleSubmit = () => {
    const startDate = moment();
    const endsAt = moment(startDate).add(subscription.period, "month");
    dispatch(
      addSubscription({
        member: member,
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
    dispatch(listMemberSubscriptions(member._id));
    handleClose();
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <div className={`${className && className}`}>
      <Button variant="primary" onClick={handleShow} title={t("Pay")}>
        {t("Add Subscription")}
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>{t("Subscribe")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-right">
          <SubscriptionForm
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

export default SubscriptionModal;
