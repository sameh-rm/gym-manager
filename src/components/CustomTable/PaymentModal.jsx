import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  listMemberSubscriptions,
  selectMember,
} from "../../redux/memberReducers/member.actions";
import {
  updateSubscription,
  selectSubscription,
} from "../../redux/subscriptionsReducers/subscriptions.actions";
import FormItem from "../forms/FormItem";
import AsyncComponent from "../Utils/AsyncComponent";

const PaymentModal = ({ subId }) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const { subscription, loading, error } = useSelector(
    (state) => state.subscription.selectSubscription
  );
  const handleShow = () => {
    dispatch(selectSubscription(subId && subId));

    setShow(true);
  };
  const valueValidation = (e) => {
    if (Number(e) > subscription.price - subscription.paid) {
      setValue(subscription.price - subscription.paid);
    } else {
      setValue(Number(e));
    }
  };
  const handleSubmit = (e) => {
    dispatch(
      updateSubscription({
        id: subscription._id,
        paid: Number(value),
      })
    );
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} title={t("Pay")}>
        <i className="fal fa-money-bill-alt"></i>
      </Button>
      {subscription && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header>
            <Modal.Title>{subscription.name}</Modal.Title>
            <AsyncComponent error={error} loading={loading} />
          </Modal.Header>
          <Modal.Body className="text-right">
            <Row>
              <Col className="py-4">{t("Price")} : </Col>
              <Col className="py-4">{subscription.price}</Col>
            </Row>
            <Row>
              <Col>{t("Paid")} : </Col>
              <Col>{subscription.paid}</Col>
            </Row>
            <FormItem
              className="mt-5"
              placeholder={t("Paid Value")}
              onChangeHandler={valueValidation}
              value={value}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t("Close")}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {t("Pay")}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default PaymentModal;
