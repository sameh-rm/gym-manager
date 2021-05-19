import Select from "react-select";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormContainer from "../../forms/FormContainer";
import FormItem from "../../forms/FormItem";
import Loader from "../../Loader";
import Message from "../../Message";
import AsyncComponent from "../../Utils/AsyncComponent";
import { uploadImage } from "../../../utils/utils";
import {
  addUser,
  updateUser,
} from "../../../redux/coreReducers/adminReducers/admin.actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const UserForm = ({ history }) => {
  const { id } = useParams();
  const { usersList } = useSelector((state) => state.core.usersList);
  const userToEdit = usersList.find((user) => user._id === id);
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [validationError, setValidationError] = useState(undefined);
  const [permissions, setPermissions] = useState([]);
  const [permissionGroups, setPermissionGroups] = useState([]);
  const { error, loading, success, createdUser } = useSelector(
    (state) => state.core.addUser
  );
  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = useSelector((state) => state.core.updateUser);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const dispatch = useDispatch();
  const saveUser = () => {
    if (password !== confirmPassword) {
      setValidationError(t("password does not match"));
    } else {
      dispatch(
        addUser({
          name,
          image,
          username,
          password,
          isAdmin,
          permissions,
          permissionGroups,
        })
      );
    }
  };

  const editUser = () => {
    if (password && password !== confirmPassword) {
      setValidationError(t("password does not match"));
    } else {
      dispatch(
        updateUser({
          id,
          name,
          image,
          username,
          password,
          isAdmin,
          permissions,
          permissionGroups,
        })
      );
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!userToEdit) saveUser();
    else editUser();
  };
  const uploadFileHandler = async (e) => {
    uploadImage(e, setUploading, setImage);
  };

  useEffect(() => {
    console.log(userToEdit);
    if ((success && createdUser) || userToEdit) {
      setName(userToEdit ? userToEdit.name : "");
      setImage(userToEdit ? userToEdit.image : "");
      setUploading(false);
      setUsername(userToEdit ? userToEdit.username : "");
      setPassword("");
      setConfirmPassword("");
      setIsAdmin(userToEdit ? userToEdit.isAdmin : false);
      setValidationError(undefined);
      setPermissions(userToEdit ? userToEdit.permissions : []);
      setPermissionGroups(userToEdit ? userToEdit.permissionGroups : []);
      return () => {
        dispatch({ type: "RESET_USER_FORM" });
        dispatch({ type: "RESET_ADD_USER_FORM" });
      };
    }
  }, [dispatch, userToEdit, success, createdUser]);
  return (
    <FormContainer>
      {validationError && <Message>{t(validationError)}</Message>}

      {success && (
        <Message variant="success">
          {t("User Was Created Successfully!")}
        </Message>
      )}
      {updateSuccess && (
        <Message variant="info">{t("User Was Updated Successfully!")}</Message>
      )}
      <Form onSubmit={submitHandler}>
        <FormItem
          title={t("Name")}
          value={name}
          placeholder={t("Enter Your Name")}
          onChangeHandler={setName}
          required
          type="text"
          key="name"
        />

        <FormItem
          title={t("Username")}
          value={username}
          placeholder={t("Enter Your Username")}
          onChangeHandler={setUsername}
          required
          type="text"
          key="username"
        />
        {!userToEdit && (
          <Row>
            <Col>
              <FormItem
                title={t("Password")}
                value={password}
                placeholder={t("Enter Your Password")}
                onChangeHandler={setPassword}
                required
                type="password"
                key="password"
              />
            </Col>
            <Col>
              <FormItem
                title={t("Confirm Password")}
                value={confirmPassword}
                placeholder={t("Confirm Your Password")}
                onChangeHandler={setConfirmPassword}
                required
                type="password"
                key="confirm_password"
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col md={8}>
            <Form.File
              id="image-file"
              label={t("Choose File")}
              custom
              style={{ textAlign: "left" }}
              onChange={uploadFileHandler}
            />
            {uploading && <Loader />}
          </Col>
          <Col md={4}>
            <Form.Group controlId="isAdmin">
              <Form.Check
                custom
                label={t("IsAdmin")}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* <FormItem
              title={t("Image")}
              value={image}
              placeholder="/images/sample.jpg"
              onChangeHandler={setImage}
              style={{ direction: "ltr" }}
              type="text"
              key="image"
            ></FormItem> */}

        <Form.Group controlId="permissionsGroups">
          <Form.Label>{t("Permission Groups")}</Form.Label>
          <Select
            options={options}
            value={permissionGroups}
            isMulti
            menuPosition="fixed"
            placeholder={t("Select Group")}
            onChange={(e) => {
              setPermissionGroups(e);
            }}
          />
        </Form.Group>
        <Form.Group controlId="permissions">
          <Form.Label>{t("Permissions")}</Form.Label>
          <Select
            options={options}
            value={permissions}
            isMulti
            menuPosition="fixed"
            placeholder={t("Select Permission")}
            onChange={(e) => {
              setPermissions(e);
            }}
          />
        </Form.Group>
        <AsyncComponent
          error={error || updateError}
          loading={loading || updateLoading}
        />
        <Button type="submit" className="float-left btn-success px-4 py-2 mb-4">
          {t("Submit")}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserForm;
