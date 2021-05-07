import { BrowserRouter as Router, Route } from "react-router-dom";
import ErrorBoundary from "./components/Utils/ErrorBoundary";
import Dashboard from "./Pages/Dashboard/Dashboard.page";
import { useTranslation } from "react-i18next";
import UsersPage from "./Pages/userpages/UsersPage";

import AddUserPage from "./Pages/userpages/AddUserPage";
import LoginPage from "./Pages/userpages/LoginPage";

function App({ history }) {
  const { i18n } = useTranslation();
  document.dir = i18n.dir();

  return (
    <Router className="App">
      <ErrorBoundary>
        <Route path="/login" component={LoginPage} />

        <Route path="/" component={Dashboard} exact />
        <Route path="/admin/users" component={UsersPage} />
        <Route path="/admin/adduser" component={AddUserPage} />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
