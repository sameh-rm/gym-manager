// import { HashRouter as Router, Route } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ErrorBoundary from "./components/Utils/ErrorBoundary";
import Dashboard from "./Pages/Dashboard/Dashboard.page";
import { useTranslation } from "react-i18next";

import UsersPage from "./Pages/userpages/UsersPage";
import AddUserPage from "./Pages/userpages/AddUserPage";
import LoginPage from "./Pages/userpages/LoginPage";
import EditUserPage from "./Pages/userpages/EditUserPage";

import MembersPage from "./Pages/membersPages/MembersPage";
import AddMemberPage from "./Pages/membersPages/AddMemberPage";
import EditMemberPage from "./Pages/membersPages/EditMemberPage";

import CoursePage from "./Pages/CoursesPages/CouresPage";
import AddCoursePage from "./Pages/CoursesPages/AddCoursePage";
import EditCoursePage from "./Pages/CoursesPages/EditCoursePage";

import MemberShipPage from "./Pages/MembershipPages/MemberShipPage";
import AddMemberShipPage from "./Pages/MembershipPages/AddMembershipPage";
import EditMembershipPage from "./Pages/MembershipPages/EditMembershipPage";
import Switch from "react-bootstrap/esm/Switch";
import MemberProfilePage from "./Pages/membersPages/MemberProfilePage";

function App({ history }) {
  const { i18n } = useTranslation();
  document.dir = i18n.dir();

  return (
    <Router className="App">
      <ErrorBoundary>
        <Switch>
          <Route path="/login" component={LoginPage} />

          <Route path="/" component={Dashboard} exact />
          <Route exact path="/admin/users" component={UsersPage} />
          <Route path="/admin/users/add" component={AddUserPage} />
          <Route path="/admin/users/:id/edit" component={EditUserPage} />

          <Route exact path="/courses" component={CoursePage} />
          <Route exact path="/courses/add" component={AddCoursePage} />
          <Route exact path="/courses/:id/edit" component={EditCoursePage} />

          <Route exact path="/memberships" component={MemberShipPage} />
          <Route exact path="/memberships/add" component={AddMemberShipPage} />
          <Route
            exact
            path="/memberships/:id/edit"
            component={EditMembershipPage}
          />

          <Route exact path="/members" component={MembersPage} />
          <Route exact path="/members/add" component={AddMemberPage} />
          <Route exact path="/members/:id/edit" component={EditMemberPage} />
          <Route
            exact
            path="/members/:id/detail"
            component={MemberProfilePage}
          />
          {/* <Route render={() => <Redirect to="/" />} /> */}
        </Switch>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
