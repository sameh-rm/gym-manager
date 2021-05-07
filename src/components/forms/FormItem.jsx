import React from "react";
import { Form } from "react-bootstrap";

const FormItem = ({
  title,
  value,
  onChangeHandler,
  type,
  placeholder,
  required,
  children,
}) => {
  return (
    <Form.Group controlId={title.toLowerCase()}>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeHandler(e.target.value)}
      ></Form.Control>
      {children}
    </Form.Group>
  );
};

export default FormItem;
