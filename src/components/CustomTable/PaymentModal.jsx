import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormItem from "../forms/FormItem";

const PaymentModal = ({ show, handleShow, handleClose }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button variant="primary" onClick={handleShow} title={t("Pay")}>
        <i className="fal fa-money-bill-alt"></i>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormItem placeholder={t("Paid Value")} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentModal;
