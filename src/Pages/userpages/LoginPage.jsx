import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/forms/FormContainer";
import FormItem from "../../components/forms/FormItem";
import AsyncComponent from "../../components/Utils/AsyncComponent";
import { login } from "../../redux/coreReducers/adminReducers/admin.actions";

const LoginPage = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, userInfo } = useSelector((state) => state.core.login);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <div className="login_page_container">
      <Container className="pt-10rem bg-transparent w-100 h-80vh">
        <div
          className={`w-50 mx-auto paper_elevation login_container ${
            i18n.dir() === "rtl" && "text-right"
          }`}
        >
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <FormItem
                placeholder="Enter your user name"
                onChangeHandler={setUsername}
                title={t("Username")}
                value={username}
                required
                type="text"
              />
              <FormItem
                placeholder="Enter your user password"
                onChangeHandler={setPassword}
                title={t("Password")}
                value={password}
                required
                type="password"
              />
              <AsyncComponent loading={loading} error={error} />

              <Button
                type="submit"
                className={`login_btn ${i18n.dir() === "rtl" && "float-left"}`}
              >
                {t("LogIn")}
              </Button>
            </Form>
          </FormContainer>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
