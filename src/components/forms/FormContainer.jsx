import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const FormContainer = ({ children, fullSize, className }) => {
  return (
    <Container className={`${className} pt-4`}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={fullSize ? 12 : 6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
