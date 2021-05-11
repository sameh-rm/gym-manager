import { BrowserRouter as Router, Route } from "react-router-dom";
import ErrorBoundary from "./components/Utils/ErrorBoundary";
import Dashboard from "./Pages/Dashboard/Dashboard.page";
import { useTranslation } from "react-i18next";
import UsersPage from "./Pages/userpages/UsersPage";
import MembersPage from "./Pages/membersPages/MembersPage";

import AddUserPage from "./Pages/userpages/AddUserPage";
import LoginPage from "./Pages/userpages/LoginPage";
import EditUserPage from "./Pages/userpages/EditUserPage";
import CoursePage from "./Pages/CoursesPages/CouresPage";

function App({ history }) {
  const { i18n } = useTranslation();
  document.dir = i18n.dir();

  return (
    <Router className="App">
      <ErrorBoundary>
        <Route path="/login" component={LoginPage} />

        <Route path="/" component={Dashboard} exact />
        <Route exact path="/admin/users" component={UsersPage} />
        <Route path="/admin/users/add" component={AddUserPage} />
        <Route path="/admin/users/:id/edit" component={EditUserPage} />

        <Route exact path="/members" component={MembersPage} />
        <Route exact path="/courses" component={CoursePage} />
        {/* <Route path="/members/add" component={AddUserPage} />
        <Route path="/admin/:id/edit" component={EditUserPage} /> */}
      </ErrorBoundary>
    </Router>
  );
}

export default App;
