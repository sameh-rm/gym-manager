import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addUser } from "../../../redux/coreReducers/adminReducers/admin.actions";
import { adminActionTypes } from "../../../redux/coreReducers/adminReducers/admin.actionTypes";
import { loadImageUrl, uploadImage } from "../../../utils/utils";
import Loader from "../../Loader";
import Message from "../../Message";
import AsyncComponent from "../../Utils/AsyncComponent";
import FormContainer from "../FormContainer";
import FormItem from "../FormItem";

const AddUserForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(
    loadImageUrl("/uploads/person-sample.jpg")
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading] = useState(false);
  const uploadFileHandler = async (e) => {
    uploadImage(e, setUploading, setImage);
  };
  const { loading, error, success } = useSelector(
    (state) => state.core.addUser
  );
  const [validationError, setValidationError] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(
        addUser({
          name,
          username,
          password,
          confirmPassword,
          image,
          isAdmin,
        })
      );
    } else {
      setValidationError(true);
    }
  };
  useEffect(() => {
    console.log(success);
    if (success) {
      history.push("/admin/users");
    }
    return () => {
      dispatch({ type: adminActionTypes.RESET_ADD_USER_FORM });
    };
  }, [success, history, dispatch]);
  return (
    <FormContainer fullSize>
      <Form className="col-md-10 mx-auto" onSubmit={submitHandler}>
        {validationError && <Message>{t("Passwords does not match!")}</Message>}
        <Row>
          <Col>
            <Row>
              <Col>
                <FormItem
                  title={t("Name")}
                  value={name}
                  placeholder={t("Name")}
                  onChangeHandler={setName}
                  required
                  type="text"
                  key="name"
                />
              </Col>

              <Col md={3}>
                <Form.Group
                  controlId="IsActive"
                  style={{ paddingTop: "2.4rem" }}
                >
                  <Form.Check
                    custom
                    label={t("IsAdmin")}
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <FormItem
              title={t("Username")}
              value={username}
              placeholder={t("Username")}
              autoComplete="username"
              onChangeHandler={setUsername}
              required
              type="text"
              key="username"
            />
            <Row>
              <Col>
                <FormItem
                  autoComplete="new-password"
                  title={t("Password")}
                  value={password}
                  placeholder={t("Password")}
                  onChangeHandler={setPassword}
                  required
                  type="password"
                  key="password"
                />
              </Col>
              <Col>
                <FormItem
                  autoComplete="new-password"
                  title={t("ConfirmPassword")}
                  value={confirmPassword}
                  placeholder={t("ConfirmPassword")}
                  onChangeHandler={setConfirmPassword}
                  required
                  type="password"
                  key="confirmPassword"
                />
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Image src={image} alt={name} fluid />
            <Form.File
              className="mt-2"
              id="image-file"
              // label={t("Choose Image")}
              style={{ textAlign: "left" }}
              onChange={uploadFileHandler}
            />
            .{uploading && <Loader />}
          </Col>
        </Row>

        <AsyncComponent error={error} loading={loading} />
        <Button type="submit" className="float-left btn-success px-4 py-2 mb-4">
          {t("Submit")}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AddUserForm;
