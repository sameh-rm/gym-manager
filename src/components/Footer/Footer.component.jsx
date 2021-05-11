import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomMenu from "../CustomeMenu/CustomMenu";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; MERN.Shop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
