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
  className,
  autoComplete,
}) => {
  return (
    <Form.Group
      className={className}
      controlId={title ? title.toLowerCase() : placeholder.toLowerCase()}
    >
      {title && <Form.Label>{title}</Form.Label>}
      <Form.Control
        autoComplete={autoComplete}
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
