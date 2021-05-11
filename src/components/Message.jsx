import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const Message = ({ variant, children }) => {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(true);
  return show ? (
    <Alert
      onClose={() => setShow(false)}
      variant={variant}
      dir={i18n.dir()}
      style={{ textAlign: i18n.dir() === "rtl" && "right" }}
    >
      {t(children)}
    </Alert>
  ) : (
    <></>
  );
};

Message.defaultProps = {
  variant: "danger",
};
export default Message;
