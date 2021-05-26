import React, { useMemo, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import { loadImageUrl, uploadImage } from "../../../utils/utils";
import Loader from "../../Loader";
import FormContainer from "../FormContainer";
import FormItem from "../FormItem";
import AsyncComponent from "../../Utils/AsyncComponent";
import { updateMember } from "../../../redux/memberReducers/member.actions";
import Select from "react-select";
const EditMemberForm = ({ member, loading, error }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const uploadFileHandler = async (e) => {
    uploadImage(e, setUploading, setImage);
  };

  const [name, setName] = useState(member ? member.name : "");
  const [gender, setGender] = useState(member ? member.gender : "");
  const [age, setAge] = useState(member ? member.age : 0);
  const [nationalId, setNationalId] = useState(member ? member.nationalId : "");
  const [phone, setPhone] = useState(member ? member.phone : "");
  const [tall, setTall] = useState(member ? member.tall : 0);
  const [weight, setWeight] = useState(member ? member.weight : 0);
  const [address, setAddress] = useState(
    member ? member.personalAddress.address : ""
  );
  const [city, setCity] = useState(member ? member.personalAddress.city : "");
  const [center, setCenter] = useState(
    member ? member.personalAddress.center : ""
  );
  const [governorate, setGovernorate] = useState(
    member ? member.personalAddress.governorate : ""
  );
  const [isActive, setIsActive] = useState(member ? member.isActive : true);
  const [image, setImage] = useState(
    member ? member.image : loadImageUrl("/uploads/person-sample.jpg")
  );
  const [uploading, setUploading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateMember({
        id,
        name,
        age,
        nationalId,
        gender,
        phone,
        tall,
        weight,
        personalAddress: { address, city, center, governorate },
        image,
        isActive,
      })
    );
  };
  const genderOptions = useMemo(
    () => [
      { label: t("Male"), value: "MALE" },
      { label: t("Female"), value: "FEMALE" },
    ],
    [t]
  );

  const [genderValue, setGenderValue] = useState(genderOptions[0]);
  return (
    <FormContainer fullSize>
      <Form className="pt-3" onSubmit={submitHandler}>
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
              <Col md={2}>
                <Form.Group
                  controlId="IsActive"
                  style={{ paddingTop: "2.4rem" }}
                >
                  <Form.Check
                    custom
                    label={t("IsActive")}
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                </Form.Group>
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
              <Form.Group controlId="Gender">
                <Form.Label>{t("Gender")}</Form.Label>
                <Select
                  options={genderOptions}
                  value={genderValue}
                  isMulti
                  menuPosition="fixed"
                  placeholder={t("Select Gender")}
                  onChange={(e) => {
                    setGenderValue(e);
                    setGender(e.value);
                  }}
                />
              </Form.Group>
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
            <Form.File
              className="mt-2"
              id="image-file"
              // label={t("Choose Image")}
              style={{ textAlign: "left" }}
              onChange={uploadFileHandler}
            >
              <Image src={image} alt={name} fluid />
            </Form.File>
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

export default EditMemberForm;
