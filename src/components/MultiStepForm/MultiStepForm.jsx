import React, { useState } from "react";
import { Button, Col, Form, ListGroupItem, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormContainer from "../forms/FormContainer";
import AsyncComponent from "../Utils/AsyncComponent";
import "./MultiStepStyles.scss";

export const MultiStepFormHeader = ({
  selectedForm,
  setSelectedForm,
  titles,
}) => {
  return (
    <Row className="justify-content-center">
      <ListGroupItem className="p-0 w-100">
        <Row className="mx-0">
          {titles.map((title, idx) => (
            <Col
              style={{
                color: selectedForm === title ? "black" : "rgb(200,200,200)",
                cursor: "pointer",
              }}
              className="multi-step_title text-center"
              key={idx}
              onClick={(e) => {
                setSelectedForm(e.target.innerText);
              }}
            >
              {title}
            </Col>
          ))}
        </Row>
      </ListGroupItem>
    </Row>
  );
};

const MultiStepForm = ({
  forms,
  submitHandler,
  fullSize,
  error,
  loading,
  courseLoading,
  courseError,
  membershipError,
  membershipLoading,
}) => {
  const titles = Object.keys(forms);
  const [selectedForm, setSelectedForm] = useState(titles[0]);
  const { t } = useTranslation();
  const currentIndex = Object.keys(forms).indexOf(selectedForm);

  return (
    <>
      <AsyncComponent
        error={error || courseError || membershipError}
        loading={loading || courseLoading || membershipLoading}
      />
      <MultiStepFormHeader
        titles={titles}
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />
      <FormContainer fullSize={fullSize}>
        <Form
          className="pt-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (currentIndex === titles.length - 1) {
              submitHandler(e);
            } else {
              const index = Object.keys(forms).indexOf(selectedForm);
              setSelectedForm(
                titles[index < titles.length - 1 ? index + 1 : index]
              );
            }
          }}
        >
          {forms[selectedForm]}

          <Row className="py-3">
            {currentIndex > 0 && (
              <Col>
                <Button
                  variant="warning"
                  className="py-2 px-4 mb-4"
                  onClick={() => {
                    const index = Object.keys(forms).indexOf(selectedForm);
                    setSelectedForm(titles[index > 0 ? index - 1 : index]);
                  }}
                >
                  {t("Back")}
                </Button>
              </Col>
            )}

            {currentIndex < titles.length && (
              <Col>
                <Button
                  type="submit"
                  variant={
                    currentIndex === titles.length - 1 ? "success" : "info"
                  }
                  className="float-left px-4 py-2 mb-4"
                >
                  {currentIndex === titles.length - 1 ? t("Submit") : t("Next")}
                </Button>
              </Col>
            )}
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default MultiStepForm;
