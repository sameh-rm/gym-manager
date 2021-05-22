import React from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { uploadImage } from "../../../utils/utils";
import Loader from "../../Loader";
import FormItem from "../FormItem";

const AddMemberForm = ({
  name,
  setName,
  image,
  setImage,
  age,
  setAge,
  nationalId,
  setNationalId,
  phone,
  setPhone,
  tall,
  setTall,
  weight,
  setWeight,
  address,
  setAddress,
  city,
  setCity,
  center,
  setCenter,
  governorate,
  setGovernorate,
  uploading,
  setUploading,
}) => {
  const { t } = useTranslation();
  const uploadFileHandler = async (e) => {
    uploadImage(e, setUploading, setImage);
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <Row>
            <Col>
              <FormItem
                title={t("Name")}
                value={name}
                placeholder={t("Name")}
                onChangeHandler={(value) => {
                  setName(value);
                }}
                required
                type="text"
                key="name"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem
                title={t("NationalID")}
                value={nationalId}
                placeholder={t("NationalID")}
                onChangeHandler={(value) => {
                  setNationalId(value);
                }}
                required
                type="text"
                key="nationalId"
              />
            </Col>
            <Col>
              <FormItem
                title={t("Phone")}
                value={phone}
                placeholder={t("Phone")}
                onChangeHandler={(value) => {
                  setPhone(value);
                }}
                required
                type="text"
                key="phone"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem
                title={t("Age")}
                value={age}
                placeholder={t("Age")}
                onChangeHandler={(value) => {
                  setAge(value);
                }}
                required
                type="text"
                key="age"
              />
            </Col>
            <Col>
              <FormItem
                title={t("Tall")}
                value={tall}
                placeholder={t("Tall")}
                onChangeHandler={(value) => {
                  setTall(value);
                }}
                required
                type="text"
                key="tall"
              />
            </Col>
            <Col>
              <FormItem
                title={t("Weight")}
                value={weight}
                placeholder={t("Weight")}
                onChangeHandler={(value) => {
                  setWeight(value);
                }}
                required
                type="text"
                key="weight"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FormItem
                title={t("Address")}
                value={address}
                placeholder={t("Address")}
                onChangeHandler={(value) => {
                  setAddress(value);
                }}
                required
                type="text"
                key="address"
              />
            </Col>
            <Col md={2}>
              <FormItem
                title={t("City")}
                value={city}
                placeholder={t("City")}
                onChangeHandler={(value) => {
                  setCity(value);
                }}
                required
                type="text"
                key="city"
              />
            </Col>
            <Col md={2}>
              <FormItem
                title={t("Center")}
                value={center}
                placeholder={t("Center")}
                onChangeHandler={(value) => {
                  setCenter(value);
                }}
                required
                type="text"
                key="center"
              />
            </Col>
            <Col md={2}>
              <FormItem
                title={t("Governorate")}
                value={governorate}
                placeholder={t("Governorate")}
                onChangeHandler={(value) => {
                  setGovernorate(value);
                }}
                required
                type="text"
                key="governorate"
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
    </>
  );
};

export default AddMemberForm;
