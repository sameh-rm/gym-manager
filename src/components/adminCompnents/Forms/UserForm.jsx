import Select from "react-select";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormContainer from "../../forms/FormContainer";
import FormItem from "../../forms/FormItem";
import Loader from "../../Loader";
import Message from "../../Message";
import { uploadImage } from "../../../utils/utils";
import { addUser } from "../../../redux/coreReducers/adminReducers/admin.actions";
import { useDispatch } from "react-redux";
const UserForm = ({ history }) => {
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
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla1", label: "Vanilla" },
    { value: "vanilla2", label: "Vanilla" },
    { value: "vanilla3", label: "Vanilla" },
    { value: "vanilla4", label: "Vanilla" },
    { value: "vanilla5", label: "Vanilla" },
    { value: "vanilla56", label: "Vanilla" },
  ];
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
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
  const uploadFileHandler = async (e) => {
    uploadImage(e, setUploading, setImage);
  };
  return (
    <FormContainer>
      {validationError && <Message>{t(validationError)}</Message>}
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
        <FormItem
          title={t("Password")}
          value={password}
          placeholder={t("Enter Your Password")}
          onChangeHandler={setPassword}
          required
          type="password"
          key="password"
        />
        <FormItem
          title={t("Confirm Password")}
          value={confirmPassword}
          placeholder={t("Confirm Your Password")}
          onChangeHandler={setConfirmPassword}
          required
          type="password"
          key="confirm_password"
        />

        <FormItem
          title={t("Image")}
          value={image}
          placeholder="/images/sample.jpg"
          onChangeHandler={setImage}
          style={{ direction: "ltr" }}
          type="text"
          key="image"
        >
          <Form.File
            id="image-file"
            label={t("Choose File")}
            custom
            style={{ textAlign: "left" }}
            onChange={uploadFileHandler}
          />
          {uploading && <Loader />}
        </FormItem>
        <Form.Group controlId="isAdmin">
          <Form.Check
            custom
            label={t("IsAdmin")}
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Group>
        <Form.Group controlId="permissionsGroups">
          <Form.Label>{t("Permission Groups")}</Form.Label>
          <Select
            options={options}
            value={permissionGroups}
            isMulti
            menuPosition="fixed"
            placeholder={t("Select Group")}
            onChange={(e) => {
              console.log(e);
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
              console.log(e);
              setPermissions(e);
            }}
          />
        </Form.Group>

        <Button type="submit" className="float-left btn-success px-4 py-2 mb-4">
          {t("Submit")}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserForm;
