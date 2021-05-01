import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.component";
import Header from "./components/Header/Header.component";
import Sidebar from "./components/Sidebar/Sidebar.component";
import Dashboard from "./Pages/Dashboard/Dashboard.page";
import "./css/yeti.bootstrap.min.css";
import { useEffect, useState } from "react";
import { request } from "./utils/request";
function App() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await request("get", "/api/members").then((res) => setMembers(res.data));
    };
    getData();
  }, []);
  return (
    <Router className="App">
      <Header />
      <main>
        <Row>
          <Sidebar />
          <Col md={10}>
            <Container>
              <Route path="/" component={Dashboard} />
              {members.map((m) => (
                <h1>{m.name}</h1>
              ))}
            </Container>
          </Col>
        </Row>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
