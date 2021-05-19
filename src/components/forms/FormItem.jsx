import React from "react";
import { Form } from "react-bootstrap";

const FormItem = (props) => {
  const {
    title,
    value,
    onChangeHandler,
    type,
    placeholder,
    required,
    children,
    className,
  } = props;
  return (
    <Form.Group
      controlId={title ? title.toLowerCase() : placeholder.toLowerCase()}
    >
      {title && <Form.Label>{title}</Form.Label>}
      <Form.Control
        className={className}
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeHandler(e.target.value)}
      />

      {children}
    </Form.Group>
  );
};

export default FormItem;
