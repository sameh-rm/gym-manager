import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomMenu from "../CustomeMenu/CustomMenu";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; MERN.Shop</Col>
          <div className="px-3 text-center">
            Hi There
            <CustomMenu header="Hi There" size="sm" />
          </div>
          <div className="px-3 text-center">
            Hi There2
            <CustomMenu header="Hi There2" size="sm" />
          </div>
          <div className="px-3 text-center">
            Hi There3
            <CustomMenu header="Hi There3" size="sm" />
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
