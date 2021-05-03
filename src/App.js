import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.component";
import Header from "./components/Header/Header.component";
import Sidebar from "./components/Sidebar/Sidebar.component";
import ErrorBoundary from "./components/Utils/ErrorBoundary";
import Dashboard from "./Pages/Dashboard/Dashboard.page";
import { useTranslation } from "react-i18next";
function App() {
  const { i18n } = useTranslation();
  document.dir = i18n.dir();
  return (
    <Router className="App">
      <ErrorBoundary>
        <div
          className="content"
          style={{ textAlign: document.dir === "rtl" ? "right" : "left" }}
        >
          <Sidebar />
          <div className="main">
            <Header />
            <main>
              <Container>
                <Route path="/" component={Dashboard} />
              </Container>
            </main>
          </div>
        </div>
        <Footer />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
