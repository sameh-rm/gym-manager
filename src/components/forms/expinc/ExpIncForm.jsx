import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import { addExpInc } from "../../../redux/expincReducers/expinc.actions";
import FormContainer from "../FormContainer";
import FormItem from "../FormItem";

const ExpIncForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const options = [
    { label: t("INCOME"), value: "IN" },
    { label: t("EXPENSE"), value: "OUT" },
  ];
  const dispatch = useDispatch();
  const [inOut, setInOut] = useState(options[1]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addExpInc({
        description,
        value,
        inOut: inOut.value,
      })
    );
  };
  const { success } = useSelector((state) => state.expinc.addExpinc);
  useEffect(() => {
    if (success) {
      history.push("/expenses");
    }
  }, [history, success]);
  return (
    <FormContainer>
      <Form className="pb-5" onSubmit={submitHandler}>
        <FormItem
          title={t("Description")}
          value={description}
          placeholder={t("Name")}
          onChangeHandler={setDescription}
          required
          type="text"
          key="description"
        />
        <FormItem
          title={t("Value")}
          value={value}
          placeholder={t("Name")}
          onChangeHandler={setValue}
          required
          type="number"
          key="value"
        />
        <Form.Group className="w-100" controlId="target">
          <Form.Label>{t("Subscription")}</Form.Label>
          <Select
            options={options}
            value={inOut}
            menuPosition="fixed"
            onChange={(option) => {
              setInOut(option);
            }}
          />
        </Form.Group>
        <Button size="lg" type="submit">
          {t("Submit")}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ExpIncForm;
