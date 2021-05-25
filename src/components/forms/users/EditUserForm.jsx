import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  updateUser,
  selectUser,
} from "../../../redux/coreReducers/adminReducers/admin.actions";
import { adminActionTypes } from "../../../redux/coreReducers/adminReducers/admin.actionTypes";
import { loadImageUrl, uploadImage } from "../../../utils/utils";
import Loader from "../../Loader";
import Message from "../../Message";
import AsyncComponent from "../../Utils/AsyncComponent";
import FormContainer from "../FormContainer";
import FormItem from "../FormItem";

const EditUserForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    user,
    loading: loadingUser,
    error: userError,
  } = useSelector((state) => state.core.selectUser);

  const [name, setName] = useState(user ? user.name : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(
    loadImageUrl("/uploads/person-sample.jpg")
  );
  const { userInfo } = useSelector((state) => state.core.login);
  const [isAdmin, setIsAdmin] = useState(user ? user.isAdmin : false);
  const [uploading, setUploading] = useState(false);
  const uploadFileHandler = async (e) => {
    uploadImage(e, setUploading, setImage);
  };
  const { loading, error, success } = useSelector(
    (state) => state.core.updateUser
  );

  const [validationError, setValidationError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(
        updateUser({
          id,
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
    dispatch(selectUser(id));
  }, [dispatch, id]);
  useEffect(() => {
    setName(user ? user.name : "");
    setUsername(user ? user.username : "");
    setIsAdmin(user ? user.isAdmin : false);
  }, [user]);
  useEffect(() => {
    if (success) {
      history.push("/admin/users");
    }
    return () => {
      dispatch({ type: adminActionTypes.RESET_SELECT_USER });
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

              {userInfo.isAdmin && (
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
              )}
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
                  title={t("password")}
                  value={password}
                  placeholder={t("password")}
                  onChangeHandler={setNewPassword}
                  //   required
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
                  //   required
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

        <AsyncComponent
          loading={loading || loadingUser}
          error={error || userError}
        />
        <Button type="submit" className="float-left btn-success px-4 py-2 mb-4">
          {t("Submit")}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default EditUserForm;
