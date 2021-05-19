import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormItem from "../FormItem";
import AsyncComponent from "../../Utils/AsyncComponent";

const MembershipForm = ({
  history,
  error,
  loading,
  updateError,
  updateLoading,
  setName,
  setDescription,
  setPrice,
  setPeriod,
  setIsActive,
  name,
  description,
  price,
  period,
  isActive,
  membershipToEdit,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Row>
        <Col>
          <FormItem
            title={t("Name")}
            value={name}
            placeholder={t("Name")}
            onChangeHandler={(value) => {
              console.log(value);
              setName(value);
            }}
            required
            type="text"
            key="name"
          />
        </Col>
        {membershipToEdit && (
          <Col md={3}>
            <Form.Group controlId="IsActive" style={{ paddingTop: "2.4rem" }}>
              <Form.Check
                custom
                label={t("IsActive")}
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </Form.Group>
          </Col>
        )}
      </Row>
      <FormItem
        title={t("Description")}
        value={description}
        placeholder={t("Description")}
        onChangeHandler={setDescription}
        required
        type="text"
        key="description"
      />
      <Row>
        <Col>
          <FormItem
            title={t("Price")}
            value={price}
            placeholder={t("Price")}
            onChangeHandler={setPrice}
            required
            type="text"
            key="price"
          />
        </Col>
        <Col>
          <FormItem
            title={t("Active Period")}
            value={period}
            placeholder={t("Active Period")}
            onChangeHandler={setPeriod}
            required
            type="text"
            key="period"
          />
        </Col>
      </Row>

      <AsyncComponent
        error={error || updateError}
        loading={loading || updateLoading}
      />
      {/* <Button type="submit" className="float-left btn-success px-4 py-2 mb-4">
        {t("Submit")}
      </Button> */}
    </>
  );
};

export default MembershipForm;
